import React, { MutableRefObject, useRef } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { headCells } from "../../../common/constans/table";
import s from "../packs.module.css";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useAppDispatch } from "../../../app/store";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import { fetchPacksTC } from "../packsReducer";

export const PacksTableHead = ({ orderRef, urlParams, orderBy, setOrderBy }: SortPropsType) => {
  const dispatch = useAppDispatch();
  let params: any;

  const onRequestSort = (event: React.MouseEvent<unknown>, property: string, order: Order) => {
    setOrderBy(property);

    let cellName = property;

    if (property === "cards") {
      cellName = "cardsCount";
    } else if (property === "lastUpdated") {
      cellName = "updated";
    }
    if (order === "asc") {
      orderRef.current = "desc";
      params = urlParams.pageCount
        ? { sortPacks: `0${cellName}`, pageCount: urlParams.pageCount }
        : { sortPacks: `0${cellName}` };
    }
    if (order === "desc") {
      orderRef.current = "asc";
      params = urlParams.pageCount
        ? { sortPacks: `1${cellName}`, pageCount: urlParams.pageCount }
        : { sortPacks: `1${cellName}` };
    }
    dispatch(fetchPacksTC(params));
    console.log(params);
  };

  return (
    <TableHead className={s.headCell}>
      <TableRow>
        <TableCell padding="none"></TableCell>
        {headCells.map((headCell) =>
          headCell.id === "cards" || headCell.id === "lastUpdated" || headCell.id === "name" ? (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? orderRef.current : false}
              className={headCell.id === "name" ? s.headCellName : s.headCellAnotherSort}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? orderRef.current : "asc"}
                onClick={(e) => onRequestSort(e, headCell.id, orderRef.current)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {orderRef.current === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                )}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? orderRef.current : false}
              className={s.headCellAnother}
            >
              {headCell.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

//////types/////////
export type Order = "asc" | "desc";

export type SortPropsType = {
  orderRef: MutableRefObject<Order>;
  urlParams: urlParamsType;
  orderBy: any;
  setOrderBy: any;
};

export type urlParamsType = {
  cardsPack_id?: string;
  pageCount?: number;
  page?: number;
};
