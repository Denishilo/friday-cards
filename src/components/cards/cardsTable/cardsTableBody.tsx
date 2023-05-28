import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import TableBody from "@mui/material/TableBody";
import s from "../cards.module.css";
import { DataCards } from "./cardsTable";

export const CardsTableBody = ({ rows }: PropsType) => {
  return (
    <TableBody>
      {rows?.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow key={index}>
            <TableCell
              id={labelId}
              scope="row"
              sx={{ paddingRight: "36px", textAlign: "left", width: "30%", flexWrap: "wrap", wordWrap: "break-word" }}
            >
              {row.questionImg ? <img className={s.cardsAnswerQuestionImg} src={row.questionImg} alt={"pic"} /> : ""}
              <div className={s.cardsField}>{row.questionImg ? "" : row.question}</div>
            </TableCell>

            <TableCell style={{ width: "30%", flexWrap: "wrap", wordWrap: "break-word" }} align="left">
              {row.answerImg ? <img className={s.cardsAnswerQuestionImg} src={row.answerImg} alt={"pic"} /> : ""}
              <div className={s.cardsField}>{row.answerImg ? "" : row.answer}</div>
            </TableCell>
            <TableCell style={{ width: "18%", flexWrap: "wrap" }} align="left">
              {row.lastUpdated}
            </TableCell>
            <TableCell style={{ width: "22%", flexWrap: "wrap" }} align="left">
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Rating
                  readOnly
                  name="text-feedback"
                  value={row.grade}
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
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
