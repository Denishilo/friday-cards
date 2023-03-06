import TablePagination from "@mui/material/TablePagination";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorCardsTotalCount } from "../cardsSelectors";

export const CardsTablePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const URLParams = Object.fromEntries(searchParams);
  const cardsTotalCount = useSelector(selectorCardsTotalCount) || 4;
  const selPage = Number(searchParams.get("page")) || 1;
  const rowPerPage = Number(searchParams.get("pageCount")) || 4;

  const [rowsPerPage, setRowsPerPage] = useState<number>(rowPerPage);
  const [page, setPage] = useState<number>(selPage - 1);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const params = { ...URLParams, page: String(newPage + 1) };
    setSearchParams(params);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = { ...URLParams, pageCount: String(event.target.value), page: "1" };
    setSearchParams(params);
    setRowsPerPage(+event.target.value);
  };
  return (
    <TablePagination
      rowsPerPageOptions={[4, 10, 20]}
      component="div"
      count={cardsTotalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
