import React from "react";
import { ActionModal } from "./actionModal";
import s from "./actionModal.module.css";
import Typography from "@mui/material/Typography";
import { ModalButtons } from "./modalButtons";
import { ActivateModalPropsType } from "./addNewPackModal";

export const DeleteConfirmation = (props: DeleteConfirmationPropsType) => {
  return (
    <ActionModal title={props.title} active={props.active} setActive={props.setActive}>
      <div className={s.deleteBox}>
        <Typography className={s.description}>
          <div>
            Do you really want to remove <span className={s.deleteName}>{props.removeItem}</span>?
          </div>
          <div>All cards will be deleted.</div>
        </Typography>
      </div>
      {props.card_id ? (
        <ModalButtons
          mode={"deleteCard"}
          card_id={props.card_id}
          pack_id={props.pack_id}
          active={props.active}
          setActive={props.setActive}
        />
      ) : (
        <ModalButtons mode={"deletePack"} pack_id={props.pack_id} active={props.active} setActive={props.setActive} />
      )}
    </ActionModal>
  );
};

type DeleteConfirmationPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  title: string;
  removeItem: string;
  pack_id: string;
  card_id?: string;
};
