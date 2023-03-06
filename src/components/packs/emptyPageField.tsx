import s from "./packs.module.css";
import { ReturnBack } from "../../common/components/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorPackName, selectorPackUserId } from "../cards/cardsSelectors";
import { SuperButton } from "../../common/components/superButton/superButton";
import { selectAppStatus, selectorPackId, selectorUserId } from "../../app/appSelectors";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { AddNewCardModal } from "../modal/addNewCardModal";

export const EmptyPageField = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const packName = useSelector(selectorPackName);
  const packId = useSelector(selectorPackId);
  const statusApp = useSelector(selectAppStatus);
  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);

  const [activeAddNewCard, setActiveAddNewCard] = useState(false);

  const isUserCardPack = userAuthId === userPackId;
  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  const addNewCardsHandler = () => {
    setActiveAddNewCard(true);
  };

  const addNewPackModalHandler = async () => {
    setActiveAddNewCard(true);
  };
  return (
    <div className={s.emptyPageWrapper}>
      <ReturnBack callback={returnToPackHandler} />
      <h3 className={s.titleEmptyPage}>{packName}</h3>

      {statusApp === "loading" ? (
        <Skeleton height={"60px"} count={5} background-color="#f3f3f3" foreground-color="#ecebeb" />
      ) : (
        <div className={s.textEmptyContainer}>
          {isUserCardPack ? <p>This pack is empty.Click add new card to fill this pack</p> : <p>This pack is empty.</p>}
          <div className={s.emptyPageButton}>
            {/*{isUserCardPack && <SuperButton name={"Add new card"} callback={addNewCardHandler} />}*/}
            {/*{isUserCardPack && <SuperButton name={"Add new card"} callback={addNewPackModalHandler} />}*/}
            {isUserCardPack && <SuperButton name={"Add new card"} callback={addNewCardsHandler} />}
          </div>
          <AddNewCardModal active={activeAddNewCard} setActive={setActiveAddNewCard} pack_id={packId} />
        </div>
      )}
    </div>
  );
};
// return (
//     <div className={s.emptyPageWrapper}>
//       <ReturnBack callback={returnToPackHandler} />
//       <h3 className={s.titleEmptyPage}>{packName}</h3>
//       { isUserCardPack === true ?
//           <div className={s.textEmptyContainer}>
//             <p>This pack is empty.Click add new card to fill this pack</p>
//             <div className={s.emptyPageButton}>
//               <SuperButton name={"Add new card"} callback={addNewCardHandler} />
//             </div>
//           </div> :
//           <div className={s.textEmptyContainer}>
//             <p>This pack is empty.</p>
//           </div>
//       }
//     </div>
// );
