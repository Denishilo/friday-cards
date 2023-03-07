import React, { useState } from "react";
import { CardsList } from "./cardsTable/cardsTable";
import s from "./cards.module.css";
import { TitleWithButton } from "../../common/components/titleWithButton/titleWithButton";
import { SearchField } from "../settingParams/searchField";
import { selectorPackName, selectorPackUserId } from "./cardsSelectors";
import { useSelector } from "react-redux";
import { ReturnBack } from "../../common/components/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useNavigate, useParams } from "react-router-dom";
import { selectAppStatus, selectorPackId, selectorUserId } from "../../app/appSelectors";
import { AddNewCardModal } from "../modal/addNewCardModal";
import { SkeletonLoader } from "../../common/components/loaders/skeletonLoader/skeletonLoader";

export const Cards = () => {
  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);
  const packName = useSelector(selectorPackName);
  const packId = useSelector(selectorPackId);
  const navigate = useNavigate();
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
