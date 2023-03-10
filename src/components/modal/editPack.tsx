import React, { ChangeEvent, useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import s from "./actionModal.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { addPackTC } from "../packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import { ModalButtons } from "./modalButtons";

import { useParams } from "react-router-dom";

import AddImage from "../../common/img/AddImage.png";
import { convertFileToBase64 } from "../../common/functions/convertFileToBase64";
import { ActivateModalPropsType } from "./addNewPackModal";

export const EditPack = (props: EditPackPropsType) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [packName, setPackName] = useState<string | undefined>(props.pack_name);
  const [disabled, setDisabled] = useState(false);
  const [addPackName, setAddPackName] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [imageDeckCover, setImageDeckCover] = useState(AddImage);

  const handleChange = () => {
    setChecked(!checked);
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (props.pack_id) {
      setPackName(e.currentTarget.value);
    } else {
      setAddPackName(e.currentTarget.value);
    }
  };

  const addNewPackName = async () => {
    const newPack = { cardsPack: { name: addPackName, deckCover: imageDeckCover, private: checked } };
    if (addPackName.trim() !== "") {
      setDisabled(true);
      await dispatch(addPackTC(newPack));
      setDisabled(false);
      props.setActive(false);
    } else {
      setError("Title is required");
    }
  };

  const saveChangePackName = async () => {
    if (props.pack_id && packName && packName.trim() !== "") {
      setError("");
      setDisabled(true);

      //await dispatch(editPackTC(props.pack_id, packName, imageDeckCover));
      setDisabled(false);
      if (id) {
        //await dispatch(getAllUserCards(id));
      }
      props.setActive(false);
    } else {
      setError("Title is required");
    }
  };

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setImageDeckCover(file64);
          console.log(file64);
          // setAvatar("111");
          // dispatch(updateUserAvatar(file64));
        });
      } else {
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };

  useEffect(() => {
    if (props.deckCover) setImageDeckCover(props.deckCover);
  }, [props.deckCover]);
  return (
    <div className={s.editPack}>
      <div className={s.deckCover}>
        <label>
          <input type="file" onChange={uploadHandler} className={s.invisibleInput} />
          <IconButton component="span" className={s.imageWrapper}>
            <img src={imageDeckCover} alt="uploadFile" className={s.addImage} />
          </IconButton>
        </label>
      </div>

      <TextField
        label={"Name pack"}
        defaultValue={props.pack_id ? props.pack_name : addPackName}
        variant="standard"
        className={s.nameInput}
        onChange={changeName}
        error={!!error}
        helperText={error}
      />
      <FormControlLabel
        label="Private pack"
        value={checked}
        className={s.checkbox}
        control={<Checkbox checked={checked} onChange={handleChange} />}
      />
      <ModalButtons
        mode={"editPack"}
        pack_id={props.pack_id}
        active={props.active}
        disabled={disabled}
        setActive={props.setActive}
        // changeName={() => changeName}
        onKeyDownSaveChangeNameHandler={props.pack_id ? saveChangePackName : addNewPackName}
      />
    </div>
  );
};

type EditPackPropsType = ActivateModalPropsType & Partial<PropsType>;

type PropsType = {
  pack_id: string;
  pack_name: string;
  deckCover?: string;
};

export default {};
