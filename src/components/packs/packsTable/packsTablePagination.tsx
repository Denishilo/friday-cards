import TablePagination from "@mui/material/TablePagination";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectorPacksTotalCount } from "../packsSelectors";
import { useSearchParams } from "react-router-dom";

export const PacksTablePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const URLParams = Object.fromEntries(searchParams);
  const totalPacksCount = useSelector(selectorPacksTotalCount) || 10;
  const [page, setPage] = useState<number>(Number(searchParams.get("page")) || 1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(Number(searchParams.get("pageCount")) || 4);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const params = { ...URLParams, page: String(newPage + 1) };
    setSearchParams(params);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const params = { ...URLParams, pageCount: String(event.target.value), page: "1" };
    setSearchParams(params);
    setRowsPerPage(+event.target.value);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[4, 10, 20]}
      component="div"
      count={totalPacksCount}
      rowsPerPage={rowsPerPage}
      page={page - 1}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
