import React, { ChangeEvent, useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import s from "./actionModal.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { addPackTC, editPackTC } from "../../feature/packs/packsReducer";
import {RootReducerType, useAppDispatch} from "../../app/store";
import { ModalButtons } from "./modalButtons";
//import { ActivateModalPropsType } from "../../feature/packs/packs";
import { useParams } from "react-router-dom";

import AddImage from "./../../img/AddImage.png";
import { convertFileToBase64 } from "../utils/convertFileToBase64";
import { ActivateModalPropsType } from "./addNewPackModal";
import {useSelector} from "react-redux";
import {selectorPacks} from "../../feature/packs/packsSelectors";

export const EditPack = (props: EditPackPropsType) => {
  const { id } = useParams();
  const packs = useSelector(selectorPacks)
  const dispatch = useAppDispatch();
  const [packName, setPackName] = useState<string | undefined>(props.pack_name);
  const [disabled, setDisabled] = useState(false);
  const [addPackName, setAddPackName] = useState<string>("");
  // const [checked, setChecked] = useState(false);
  const [checked, setChecked] = useState(props.privatePack);
  const [error, setError] = useState<null | string>(null);
  const [imageDeckCover, setImageDeckCover] = useState(AddImage);

  console.log("editPack id", id)
  console.log("editPack packId", props.pack_id)
  console.log("editPack private", props.privatePack)
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

  const saveChangePack = async () => {
    if (props.pack_id && packName && packName.trim() !== "") {
      setError("");
      setDisabled(true);
      console.log("saveChangePackName")
      // await dispatch(editPackTC(props.pack_id, packName, imageDeckCover));
      const changePack = {cardsPack: { _id: props.pack_id, name: packName, deckCover: imageDeckCover, private: checked, user_id: props.user_id}}
      await dispatch(editPackTC(changePack));
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
        onKeyDownSaveChangeNameHandler={props.pack_id ? saveChangePack : addNewPackName}
      />
    </div>
  );
};

type EditPackPropsType = ActivateModalPropsType & Partial<PropsType>;

type PropsType = {
  pack_id: string;
  pack_name: string;
  deckCover?: string;
  privatePack?: boolean;
  user_id: string
};

export default {};
