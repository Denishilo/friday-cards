import React from "react";
import { DeleteConfirmation } from "./deleteConfirmation";
import { ActivateModalPropsType } from "./addNewPackModal";

export const DeleteCardModal = (props: DeleteCardModalPropsType) => {
  return (
    <DeleteConfirmation
      title={"Delete Card"}
      removeItem={props.questionTitle}
      card_id={props.card_id}
      active={props.active}
      setActive={props.setActive}
      pack_id={props.pack_id}
    />
  );
};

type DeleteCardModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  questionTitle: string;
  card_id: string;
  pack_id: string;
};
