import React, { ChangeEvent, useState } from "react";
import s from "./actionModal.module.css";
import { Stack, TextField } from "@mui/material";
import { SelectQuestion } from "./selectQuestion";
import { ModalButtons } from "./modalButtons";
import { useAppDispatch } from "../../app/store";
import { addNewCardTC, editCardTC } from "../cards/cardsReducer";
import { ActivateModalPropsType } from "./addNewPackModal";
import { EditCardRequestType } from "../cards/cardsAPI";
import Button from "@mui/material/Button";
import { convertFileToBase64 } from "../profile/badgeAvatar";

export const CreateCard = (props: CreateNewCardPropsType) => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [disabled, setDisabled] = useState(false);

  const [questionImg, setQuestionImg] = useState<string>("");
  const [answerImg, setAnswerImg] = useState<string>("");
  const [fileFormat, setFileFormat] = useState<string | undefined>(props.questionFormat || "Text");
  const [errorQuestion, setErrorQuestion] = useState<null | string>(null);
  const [errorAnswer, setErrorAnswer] = useState<null | string>(null);

  const addQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorQuestion("");
    setQuestion(e.currentTarget.value);
  };

  const addAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorAnswer("");
    setAnswer(e.currentTarget.value);
  };
  const setFileFormatHandler = (fileFormat: string) => setFileFormat(fileFormat);

  // const addNewCardd = async () => {
  //   if (props.pack_id) {
  //     setDisabled(true);
  //     const newCard: NewCardRequestType = {
  //       card: {
  //         cardsPack_id: props.pack_id,
  //         question,
  //         answer,
  //       },
  //     };
  //     await dispatch(addNewCardTC(newCard));
  //     setDisabled(false);
  //     props.setActive(false);
  //   }
  // };
  const addNewCard = async () => {
    if (props.pack_id && question.trim() !== "" && answer.trim() !== "") {
      setDisabled(true);
      const params = {
        card: {
          cardsPack_id: props.pack_id,
          question,
          answer,
        },
      };
      await dispatch(addNewCardTC(params));
      setDisabled(false);
      props.setActive(false);
      //navigate(`${PATH.CARDS_LIST}${props.pack_id}`);
      console.log("navigate", props.pack_id);
    }
    if (props.pack_id && questionImg.trim() !== "" && answerImg.trim() !== "") {
      setDisabled(true);
      const params = {
        card: {
          cardsPack_id: props.pack_id,
          question,
          answer,
          answerImg,
          questionImg,
        },
      };
      await dispatch(addNewCardTC(params));
      setDisabled(false);
      props.setActive(false);
      //navigate(`${PATH.CARDS_LIST}${props.pack_id}`);
    }
    if (question.trim() === "") {
      setErrorQuestion("Question is required");
    }
    if (answer.trim() === "") {
      setErrorAnswer("Answer is required");
    }
  };
  console.log(answerImg);

  const uploadQuestionImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setQuestionImg(file64);
        });
      } else {
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };

  const uploadAnswerImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAnswerImg(file64);
        });
      } else {
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };

  const editCard = async () => {
    if (props.card_id && props.pack_id) {
      const editCard: EditCardRequestType = {
        card: {
          _id: props.card_id,
          question,
          answer,
          answerImg,
          questionImg,
        },
      };
      await dispatch(editCardTC(editCard, props.pack_id));
      props.setActive(false);
    }
  };

  console.log(fileFormat);

  return (
    <div>
      <SelectQuestion changeQuestionFormat={setFileFormatHandler} questionFormat={props.questionFormat} />
      {fileFormat === "Text" ? (
        <>
          <TextField
            label={"Question"}
            variant="standard"
            className={s.nameInput}
            onChange={addQuestion}
            error={!!errorQuestion}
            helperText={errorQuestion}
            defaultValue={props.questionTitle ? props.questionTitle : question}
          />
          <TextField
            label={"Answer"}
            defaultValue={props.answer ? props.answer : answer}
            variant="standard"
            className={s.nameInput}
            error={!!errorAnswer}
            helperText={errorAnswer}
            style={{ marginBottom: "108px" }}
            onChange={addAnswer}
          />
          <ModalButtons
            mode={props.mode === "editCard" ? "editCard" : "addCard"}
            pack_id={props.pack_id}
            active={props.active}
            disabled={disabled}
            setActive={props.setActive}
            onKeyDownSaveChangeNameHandler={props.mode === "editCard" ? editCard : addNewCard}
          />
        </>
      ) : (
        <>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 5 }}
          >
            <div>
              <div>
                <img className={s.questionImg} src={questionImg || undefined} />
                <label className={s.uploadButtons}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadQuestionImgHandler}
                    className={s.invisibleInput}
                  />
                  <Button variant="contained" component="span">
                    Upload question
                  </Button>
                </label>
              </div>
              <div>
                <img className={s.answerImg} src={answerImg || undefined} />
                <label className={s.uploadButtons}>
                  <input type="file" accept="image/*" onChange={uploadAnswerImgHandler} className={s.invisibleInput} />
                  <Button sx={{ marginTop: 3 }} variant="contained" component="span">
                    Upload answer
                  </Button>
                </label>
              </div>
            </div>
          </Stack>
          <ModalButtons
            mode={props.mode === "editCard" ? "editCard" : "addCard"}
            pack_id={props.pack_id}
            active={props.active}
            disabled={questionImg.trim() === "" || answerImg.trim() === "" ? true : false}
            setActive={props.setActive}
            onKeyDownSaveChangeNameHandler={props.mode === "editCard" ? editCard : addNewCard}
          />
        </>
      )}
    </div>
  );
};

type CreateNewCardPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  mode: "editCard" | "addCard";
  pack_id: string | undefined;
  card_id?: string;
  changeName: () => void;
  pack_name?: string;
  questionTitle?: string;
  answer?: string;
  active: boolean;
  setActive: string;
  questionFormat?: string | undefined;
};
