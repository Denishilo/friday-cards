import React from "react";
import s from "./actionModal.module.css";
import Button from "@mui/material/Button";
import { deletePackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import { deleteCardTC } from "../../feature/cards/cardsReducer";
import { useSearchParams } from "react-router-dom";

export const ModalButtons = (props: ButtonsPropsType) => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id") || "";
  const dispatch = useAppDispatch();
  const URLParams = Object.fromEntries(searchParams);

  const deleteHandler = () => {
    if (props.card_id && props.pack_id && props.mode === "deleteCard") {
      dispatch(deleteCardTC(props.card_id, props.pack_id));
    }
    if (props.pack_id && props.mode === "deletePack") {
      dispatch(deletePackTC(props.pack_id, userId, Number(URLParams.pageCount), Number(URLParams.page), Number(URLParams.min), Number(URLParams.max)));
    }
  };

  const cancelButtonHandler = () => {
    props.setActive(false);
  };

  return (
    <div className={s.buttonBox}>
      <Button variant="contained" className={s.cancel} onClick={cancelButtonHandler}>
        Cancel
      </Button>
      {props.mode === "deleteCard" || props.mode === "deletePack" ? (
        <Button variant="contained" className={s.delete} onClick={deleteHandler}>
          Delete
        </Button>
      ) : (
        <Button
          variant="contained"
          className={s.save}
          disabled={props.disabled}
          // onClick={props.mode === "add" ? addNewPacksHandler : props.onKeyDownSaveChangeNameHandler}
          onClick={props.onKeyDownSaveChangeNameHandler}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export type ButtonsPropsType = {
  mode: "add" | "editPack" | "deleteCard" | "deletePack" | "addCard" | "editCard";
  pack_id?: string;
  card_id?: string;
  onKeyDownSaveChangeNameHandler?: () => void;
  disabled?: boolean;
  active: boolean;
  setActive: any;
};
