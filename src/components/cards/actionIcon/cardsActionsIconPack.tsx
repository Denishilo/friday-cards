import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import s from "./actionsIconPack.module.css";
import React, { useState } from "react";
import { selectorIdUser } from "../../loginRegistration/authSelectors";
import { useSelector } from "react-redux";
import { DeleteCardModal } from "../../modal/deleteCardModal";
import { EditCardModal } from "../../modal/editCardModal";

type ActionsIconPackType = {
  user_id: string;
  questionTitle: string;
  card_id: string;
  pack_id: string;
  answer: string;
  questionImg: string;
  answerImg: string;
};

export const CardsActionsIconPack = (props: ActionsIconPackType) => {
  const userAuthId = useSelector(selectorIdUser);

  const [openDeleteModalCard, setOpenDeleteModalCard] = useState(false);
  const [openEditModalCard, setOpenEditModalCard] = useState(false);

  const editPackCallback = () => {
    setOpenEditModalCard(true);
  };

  const deletePackCallback = () => {
    setOpenDeleteModalCard(true);
  };
  const questionFormat = !props.answerImg ? "Text" : "Img";
  return (
    <div className={s.wrapper}>
      <span onClick={editPackCallback}>{props.user_id === userAuthId ? <BorderColorOutlinedIcon /> : null}</span>
      <span className={s.deleteButton} onClick={deletePackCallback}>
        {props.user_id === userAuthId ? <DeleteOutlinedIcon /> : null}
      </span>
      <DeleteCardModal
        active={openDeleteModalCard}
        setActive={setOpenDeleteModalCard}
        questionTitle={!props.answerImg ? props.questionTitle : "this card"}
        card_id={props.card_id}
        pack_id={props.pack_id}
      />
      <EditCardModal
        active={openEditModalCard}
        setActive={setOpenEditModalCard}
        questionTitle={props.questionTitle}
        questionFormat={questionFormat}
        answer={props.answer}
        pack_id={props.pack_id}
        card_id={props.card_id}
      />
    </div>
  );
};
