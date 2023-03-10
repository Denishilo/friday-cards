import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import s from "./TitleWithButton.module.css";
import learnIcon from "../../img/learnIcon.svg";
import { TitleDropdown } from "./titleDropdown";
import { SuperButton } from "../superButton/superButton";
import { PATH } from "../../constans";
import { selectorUserId } from "app/appSelectors";
import { selectorPackName, selectorPackUserId } from "components/cards/cardsSelectors";

export const TitleWithButton = (props: TitleWithButtonPropsType) => {
  const { title, nameButton, callback } = props;
  const packName = useSelector(selectorPackName);
  const userAuthId = useSelector(selectorUserId);
  const [searchParams] = useSearchParams();
  const isCardPack = JSON.stringify(Object.fromEntries(searchParams)).includes("cardsPack_id");
  const userPackId = useSelector(selectorPackUserId);
  const navigate = useNavigate();
  const id = Object.fromEntries(searchParams).cardsPack_id;

  const learnPackHandler = () => {
    navigate(`${PATH.LEARN_PACK}/?cardsPack_id=${id}`);
  };

  return (
    <div className={s.titleButton}>
      <h2>{!userPackId ? packName || "Packs list" : title}</h2>
      {userAuthId === userPackId && isCardPack ? <TitleDropdown pack_id={id} pack_name={packName} /> : null}
      {isCardPack && (
        <button className={s.learnButton} onClick={learnPackHandler}>
          <img className={s.learnIcon} src={learnIcon} alt="" />{" "}
        </button>
      )}
      <div className={s.button}>
        <SuperButton name={nameButton} callback={callback} />
      </div>
    </div>
  );
};
export type TitleWithButtonPropsType = {
  title: string;
  nameButton: string;
  callback: () => void;
};
