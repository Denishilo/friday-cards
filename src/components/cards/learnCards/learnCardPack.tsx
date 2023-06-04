import s from "./learnCardPack.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector } from "react-redux";
import { selectorCards, selectorPackName } from "../cardsSelectors";
import { useAppDispatch } from "app/store";
import { useEffect, useState } from "react";
import { getCardsTC, updateGradeCardTC } from "../cardsReducer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SuperButton } from "common/components";
import { ReturnBack } from "common/components";
import { PATH } from "common/constans";
import { selectAppStatus } from "app/appSelectors";
import { generateRandomQuestion } from "common/functions/smartRandom/generateRandomQuestion";
import { CardParamsType, UpdateGradeCardType } from "../cardsAPI";
import { selectorMax } from "../../packs/packsSelectors";
import { SkeletonLoader } from "common/components";

export const LearnCardPack = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const packId = searchParams.get("cardsPack_id") || "";
  const cards = useSelector(selectorCards);

  const cardsPackName = useSelector(selectorPackName);
  const maxValueCards = useSelector(selectorMax);
  const statusApp = useSelector(selectAppStatus);

  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [cardId, setCardID] = useState<string>(cards ? cards[currentQuestion]._id : "");
  const [cardGrade, setCardGrade] = useState<number>(cards ? cards[currentQuestion].grade : 0);
  const [cardShot, setCardShot] = useState<number>(cards ? cards[currentQuestion].shots : 0);

  useEffect(() => {
    const params: CardParamsType = {
      cardsPack_id: packId,
      pageCount: maxValueCards,
    };
    dispatch(getCardsTC(params));
  }, [searchParams]);

  useEffect(() => {
    if (cards && cards[currentQuestion]) {
      setCardID(cards[currentQuestion]._id);
    }
  }, [cards]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  const onNextClickHandler = () => {
    const nextQuestion = generateRandomQuestion(cards);
    const updateGradeCard: UpdateGradeCardType = {
      grade: cardGrade,
      card_id: cardId,
    };

    if (nextQuestion < cards.length) {
      setCurrentQuestion(nextQuestion);
      setCardID(cards[nextQuestion]._id);
      setCardShot(cardShot + 1);
      dispatch(updateGradeCardTC(updateGradeCard));
      setCardShot(cardShot);
      setExpanded(!expanded);
    } else {
      setExpanded(!expanded);
      dispatch(updateGradeCardTC(updateGradeCard));
    }
  };

  return (
    <div className={s.wrapper}>
      {statusApp === "loading" ? (
        <SkeletonLoader height={"50px"} />
      ) : (
        <>
          <ReturnBack callback={returnToPackHandler} />
          <h2 className={s.title}> Learn {cardsPackName} </h2>
          <Card className={s.card}>
            <CardContent className={s.content}>
              <Typography paragraph>
                <b>Question:</b>
                {cards ? (
                  cards[currentQuestion].questionImg ? (
                    <img className={s.answerImg} src={cards[currentQuestion].questionImg || undefined} alt={"pic"} />
                  ) : cards ? (
                    cards[currentQuestion].question
                  ) : (
                    "question"
                  )
                ) : null}
              </Typography>
              <Typography paragraph>
                Number of attempts to answer the question: {cards ? cards[currentQuestion].shots : "shots"}
              </Typography>
            </CardContent>
            <CardActions className={s.buttonShow} disableSpacing>
              <SuperButton name={"Show answer"} callback={handleExpandClick} />
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent className={s.contentAnswer}>
                <Typography paragraph>
                  <b>Answer:</b>
                  {cards ? (
                    cards[currentQuestion].answerImg ? (
                      <img className={s.answerImg} src={cards[currentQuestion].answerImg || undefined} alt={"pic"} />
                    ) : cards ? (
                      cards[currentQuestion].answer
                    ) : (
                      "answer"
                    )
                  ) : null}
                </Typography>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Did not know"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      onClick={() => {
                        setCardGrade(1);
                      }}
                      value="Did not know"
                      control={<Radio />}
                      label="Did not know"
                    />
                    <FormControlLabel
                      onClick={() => {
                        setCardGrade(2);
                      }}
                      value="Forgot"
                      control={<Radio />}
                      label="Forgot"
                    />
                    <FormControlLabel
                      onClick={() => {
                        setCardGrade(3);
                      }}
                      value="A lot of thought"
                      control={<Radio />}
                      label="A lot of thought"
                    />
                    <FormControlLabel
                      onClick={() => {
                        setCardGrade(4);
                      }}
                      value="Confused"
                      control={<Radio />}
                      label="Confused"
                    />
                    <FormControlLabel
                      onClick={() => {
                        setCardGrade(5);
                      }}
                      value="Knew the answer"
                      control={<Radio />}
                      label="Knew the answer"
                    />
                  </RadioGroup>
                  <CardActions className={s.buttonNext} disableSpacing>
                    <SuperButton name={"Next"} callback={onNextClickHandler} />
                  </CardActions>
                </FormControl>
              </CardContent>
            </Collapse>
          </Card>
        </>
      )}
    </div>
  );
};
