import { ReturnBack } from "../../common/components/returnBack/returnBack";
import s from "./packs.module.css";
import React, { FC } from "react";

export const NotFoundPage: FC<PropsType> = ({ callback, type }) => {
  return (
    <div>
      <ReturnBack callback={callback} type={type} />
      <div className={s.notFoundPacks}> {type} not found</div>
    </div>
  );
};

///////////// types ///////////////
type PropsType = {
  callback: () => void;
  type: "Cards" | "Packs";
};
