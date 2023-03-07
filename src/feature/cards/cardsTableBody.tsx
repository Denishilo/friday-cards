import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import {Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import s from "./Cards.module.css";
import TableBody from "@mui/material/TableBody";
import React from "react";
import {DataCards} from "./cardsTable";

export const CardsTableBody = ({rows}: PropsType) => {
    return (
        <TableBody>
            {rows?.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <TableRow key={index}>
                        <TableCell align={"center"} padding={"none"}/>
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{paddingRight: "36px", textAlign: "left", maxWidth: 252,flexWrap: 'wrap',wordWrap:'break-word'}}>
                            <img src={row.questionImg || undefined} className={s.questionImg}/>
                            {row.questionImg ? null : row.question}
                        </TableCell>
                        <TableCell style={{ maxWidth: 252,flexWrap: 'wrap',wordWrap:'break-word'}} align="left">
                            <img src={row.answerImg || undefined} className={s.answerImg}/>
                            {row.answerImg ? null : row.answer}
                        </TableCell>
                        <TableCell style={{maxWidth: 252, flexWrap:'wrap'}} align="left">{row.lastUpdated}</TableCell>
                        <TableCell style={{maxWidth: 252, flexWrap:'wrap',}} align="left">
                            <Box
                                sx={{width: 170, display: "flex", flexWrap:'wrap'}}>
                                <Rating
                                    readOnly
                                    name="text-feedback"
                                    value={row.grade}
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                                />
                                <span className={s.icons}>{row.actions}</span>
                            </Box>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

/////////// types /////////
type PropsType = {
    rows: DataCards[];
};
