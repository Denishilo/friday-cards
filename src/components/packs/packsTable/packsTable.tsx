import React, { useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import { fetchPacksTC, setSearchFieldEmpty } from "../packsReducer";
import { useAppDispatch } from "app/store";
import { useSelector } from "react-redux";
import { selectorPacks } from "../packsSelectors";
import { ActionsIconPack } from "common/components/actionIconPack/actionsIconPack";
import { Order, PacksTableHead } from "./packsTableHead";
import { PacksTableBody } from "./packsTableBody";
import { PacksTablePagination } from "./packsTablePagination";
import { Paper } from "@mui/material";
import { selectAppStatus } from "app/appSelectors";
import { SkeletonLoader } from "common/components";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { selectorLogin } from "../../loginRegistration/authSelectors";
import { PATH } from "common/constans";
import { NotFoundPage } from "../notFoundPage";

export const PacksTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const URLParams = Object.fromEntries(searchParams);
  const searchPackName = searchParams.get("packName");

  const isLogin = useSelector(selectorLogin);
  const packs = useSelector(selectorPacks);
  const statusApp = useSelector(selectAppStatus);
  const isPacksEmpty = packs.cardPacks.length === 0;
  const orderRef = useRef<Order>("asc");

  const [orderBy, setOrderBy] = React.useState<string>("cards");

  useEffect(() => {
    if (isLogin) {
      dispatch(setSearchFieldEmpty(false));
      dispatch(fetchPacksTC(URLParams));
    }
  }, [dispatch, searchParams, isPacksEmpty]);

  function createData(
    deckCover: string | undefined,
    name: string,
    cards: number,
    createdBy: string,
    lastUpdated: string,
    id: string,
    actions: any
  ): DataRows {
    return { deckCover, name, cards, lastUpdated, createdBy, id, actions };
  }

  const rows = packs.cardPacks.map((pack) => {
    return createData(
      pack.deckCover,
      pack.name,
      pack.cardsCount,
      pack.user_name,
      pack.updated.substring(0, 10),
      pack._id,
      <ActionsIconPack
        user_id={pack.user_id}
        pack_id={pack._id}
        pack_name={pack.name}
        cards_count={pack.cardsCount}
        deckCover={pack.deckCover}
      />
    );
  });

  const returnPacksHandler = () => {
    navigate(PATH.PACKS);
  };

  if (!isLogin) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return (
    <div>
      {statusApp === "loading" ? (
        <SkeletonLoader count={5} height={"60px"} />
      ) : (
        <div>
          {isPacksEmpty && searchPackName ? (
            <NotFoundPage type={"Packs"} callback={returnPacksHandler} />
          ) : (
            <Paper>
              <Table aria-labelledby="tableTitle" size={"medium"}>
                <PacksTableHead orderRef={orderRef} urlParams={URLParams} orderBy={orderBy} setOrderBy={setOrderBy} />
                <PacksTableBody rows={rows} />
              </Table>
              <PacksTablePagination />
            </Paper>
          )}
        </div>
      )}
    </div>
  );
};

/////////// types //////////////
export type DataRows = {
  deckCover: string | undefined;
  name: string;
  cards: number;
  createdBy: string;
  lastUpdated: string;
  id: string;
  actions: any;
};
