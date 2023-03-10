import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CardsList } from "./cardsTable/cardsTable";
import { TitleWithButton } from "common/components/titleWithButton/titleWithButton";
import { SearchField } from "../settingParams/searchField";
import { selectorPackName, selectorPackUserId } from "./cardsSelectors";
import { ReturnBack } from "common/components";
import { PATH } from "common/constans/path/path";
import { useNavigate } from "react-router-dom";
import { selectAppStatus, selectorPackId, selectorUserId } from "app/appSelectors";
import { AddNewCardModal } from "../modal/addNewCardModal";
import { SkeletonLoader } from "common/components";
import s from "./cards.module.css";

export const Cards = () => {
  const navigate = useNavigate();

  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);
  const packName = useSelector(selectorPackName);
  const packId = useSelector(selectorPackId);
  const statusApp = useSelector(selectAppStatus);

  const [activeAddNewCard, setActiveAddNewCard] = useState(false);

  const addNewCardsHandler = () => {
    setActiveAddNewCard(true);
  };

  const learnFriendPackHandler = () => {
    navigate(`${PATH.LEARN_PACK}/?cardsPack_id=${packId}`);
  };

  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  const resNameButton = userAuthId === userPackId ? "Add new card" : "Learn to pack";
  const addLearnHandler = () => (userAuthId === userPackId ? addNewCardsHandler() : learnFriendPackHandler());

  return (
    <div className={s.wrapper}>
      <ReturnBack callback={returnToPackHandler} />
      {statusApp === "loading" ? (
        <SkeletonLoader height={"50px"} />
      ) : (
        <TitleWithButton title={packName} nameButton={resNameButton} callback={addLearnHandler} />
      )}
      <div className={s.search}>
        <SearchField type={"cards"} />
      </div>
      <AddNewCardModal active={activeAddNewCard} setActive={setActiveAddNewCard} pack_id={packId} />
      <CardsList />
    </div>
  );
};
