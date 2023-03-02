import s from "./TitleWithButton.module.css";
import {SuperButton} from "../superButton/superButton";
import React from "react";
import PATH from "../constans/path/path";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorUserId} from "../../app/appSelectors";
import {selectorPackName, selectorPackUserId} from "../../feature/cards/cardsSelectors";
import {TitleDropdown} from "./titleDropdown";
import learnIcon from "../../img/learnIcon.svg";

export const TitleWithButton = (props: TitleWithButtonPropsType) => {
    const {title, nameButton, callback} = props;
    const packName = useSelector(selectorPackName);
    const userAuthId = useSelector(selectorUserId);
    const [searchParams] = useSearchParams();
    const isCardPack = JSON.stringify(Object.fromEntries(searchParams)).includes("cardsPack_id")
    const userPackId = useSelector(selectorPackUserId);
    const navigate = useNavigate();
    const _id = JSON.stringify(Object.fromEntries(searchParams)).substring(17,41)

    const learnPackHandler = () => {
        navigate(`${PATH.LEARN_PACK}/?cardsPack_id=${_id}`);
    };

    return (
        <div className={s.titleButton}>
            <h2>{!userPackId ? packName || 'Packs list' : title}</h2>
            {userAuthId === userPackId && isCardPack  ? < TitleDropdown pack_id={_id} pack_name={packName}/>  : null }
            {isCardPack && (
                <button className={s.learnButton} onClick={learnPackHandler}><img className={s.learnIcon}  src={learnIcon } alt=""/> </button>
            )}
            <div className={s.button}>
                <SuperButton name={nameButton} callback={callback}/>
            </div>
        </div>
    );
};
export type TitleWithButtonPropsType = {
    title: string;
    nameButton: string;
    callback: () => void;
};
