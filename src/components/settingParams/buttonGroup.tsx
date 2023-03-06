import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import s from "./settingParams.module.css";
import { useSelector } from "react-redux";
import { selectorIdUser } from "../loginRegistration/authSelectors";
import { useSearchParams } from "react-router-dom";

export const GroupButtons = () => {
  const idUser = useSelector(selectorIdUser);

  const [searchParams, setSearchParams] = useSearchParams();
  const URLid = searchParams.get("user_id");
  const URLParams = Object.fromEntries(searchParams);

  const colorActiveMyButton = URLid ? "#FFFFFF" : "#000000";
  const colorActiveAllButton = !URLid ? "#FFFFFF" : "#000000";
  const bgColorMyButton = URLid ? "#366EFF;" : "#FFFFFF";
  const bgColorAllButton = !URLid ? "#366EFF;" : "#FFFFFF";

  const myButtonHandler = () => {
    const params = { ...URLParams, user_id: idUser };

    setSearchParams(params);
  };

  const allButtonHandler = () => {
    const params = { ...URLParams, user_id: "" };

    setSearchParams(params);
  };

  const buttons = [
    <Button
      onClick={myButtonHandler}
      sx={{
        border: "1px solid #D9D9D9",
        color: colorActiveMyButton,
        backgroundColor: bgColorMyButton,
        ":hover": {
          backgroundColor: bgColorMyButton,
        },
      }}
      key="my"
    >
      My
    </Button>,
    <Button
      onClick={allButtonHandler}
      sx={{
        border: "1px solid #D9D9D9",
        color: colorActiveAllButton,
        backgroundColor: bgColorAllButton,
        ":hover": {
          backgroundColor: bgColorAllButton,
        },
      }}
      key="all"
    >
      All
    </Button>,
  ];
  return (
    <div>
      <h2 className={s.titleSearchField}>Show packs cards</h2>
      <Box
        sx={{
          display: "flex",
          color: "black",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ButtonGroup size="large" aria-label="large button group">
          {buttons}
        </ButtonGroup>
      </Box>
    </div>
  );
};
