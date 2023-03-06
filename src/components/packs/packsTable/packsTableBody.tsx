import PATH from "../../../common/constans/path/path";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DataRows } from "./packsTable";
import { useAppDispatch } from "../../../app/store";
import { setCurrentPackId } from "../../../app/appReducer";
import s from "../packs.module.css";
import EmptyImage from "../../../common/img/EmptyImage.png";
import BrokenImage from "../../../common/img/BrokenImage.png";

export const PacksTableBody = ({ rows }: PropsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToCardsList = (id: string) => {
    dispatch(setCurrentPackId(id));
    navigate(`${PATH.CARDS_LIST}?cardsPack_id=${id}`);
  };

  const errorHandler = () => {
    return <img src={BrokenImage} className={s.deckCover} />;
  };
  return (
    <TableBody>
      {rows.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow key={row.id}>
            <TableCell align={"center"} padding={"none"} />
            <TableCell sx={{ maxWidth: 252 }} align="left">
              {row.deckCover ? (
                <img src={row.deckCover} className={s.deckCover} onError={errorHandler} />
              ) : (
                <img src={EmptyImage} className={s.deckCover} />
              )}
            </TableCell>
            <TableCell
              onClick={() => goToCardsList(row.id)}
              component="th"
              id={labelId}
              scope="row"
              sx={{ paddingRight: "36px", textAlign: "left", cursor: "pointer", wordWrap: "break-word", maxWidth: 252 }}
            >
              {row.name}
            </TableCell>
            <TableCell sx={{ maxWidth: 252 }} align="left">
              {row.cards}
            </TableCell>
            <TableCell sx={{ maxWidth: 252 }} align="left">
              {row.lastUpdated}
            </TableCell>
            <TableCell sx={{ maxWidth: 252 }} align="left">
              {row.createdBy}
            </TableCell>
            <TableCell sx={{ maxWidth: 252 }} align="left">
              {row.actions}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export type PropsType = {
  rows: DataRows[];
};
