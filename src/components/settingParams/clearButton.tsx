import FormatClearIcon from "@mui/icons-material/FormatClear";
import React from "react";
import s from "./settingParams.module.css";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "app/store";
import { setSearchFieldEmpty } from "../packs/packsReducer";

export const ClearButton = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const clearParams = () => {
    dispatch(setSearchFieldEmpty(true));

    setSearchParams({});
  };
  return (
    <div onClick={clearParams} className={s.wrapperClearButton}>
      <div>
        <FormatClearIcon />
      </div>
    </div>
  );
};
