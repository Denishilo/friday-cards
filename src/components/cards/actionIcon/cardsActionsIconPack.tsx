import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import s from "./actionsIconPack.module.css";
import { selectorIdUser } from "../../loginRegistration/authSelectors";
import { DeleteCardModal } from "../../modal/deleteCardModal";
import { EditCardModal } from "../../modal/editCardModal";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const CardsActionsIconPack: FC<Props> = (props) => {
  const { answerImg, user_id, questionTitle, card_id, pack_id, answer } = props;
  const userAuthId = useSelector(selectorIdUser);

  const [openDeleteModalCard, setOpenDeleteModalCard] = useState(false);
  const [openEditModalCard, setOpenEditModalCard] = useState(false);

  const editPackCallback = () => {
    setOpenEditModalCard(true);
  };

  const deletePackCallback = () => {
    setOpenDeleteModalCard(true);
  };
  const questionFormat = answerImg ? "Text" : "Img";

  return (
    <div className={s.wrapper}>
      <span onClick={editPackCallback}>{user_id === userAuthId ? <BorderColorOutlinedIcon /> : null}</span>
      <span className={s.deleteButton} onClick={deletePackCallback}>
        {user_id === userAuthId ? <DeleteOutlinedIcon /> : null}
      </span>
      <DeleteCardModal
        active={openDeleteModalCard}
        setActive={setOpenDeleteModalCard}
        questionTitle={!answerImg ? questionTitle : "this card"}
        card_id={card_id}
        pack_id={pack_id}
      />
      <EditCardModal
        active={openEditModalCard}
        setActive={setOpenEditModalCard}
        questionTitle={questionTitle}
        questionFormat={questionFormat}
        answer={answer}
        pack_id={pack_id}
        card_id={card_id}
      />
    </div>
  );
};

/////////////types ///////////////
type Props = {
  user_id: string;
  questionTitle: string;
  card_id: string;
  pack_id: string;
  answer: string;
  questionImg: string;
  answerImg: string;
};
