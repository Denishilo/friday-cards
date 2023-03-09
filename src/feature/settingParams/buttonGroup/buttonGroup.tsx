import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import s from "../searchField/SearchField.module.css";
import { useSelector } from "react-redux";
import { selectorIdUser } from "../../loginRegistration/selectors";
import { useSearchParams } from "react-router-dom";
import {fetchPacksTC} from "../../packs/packsReducer";
import {useAppDispatch} from "../../../app/store";
import {useState} from "react";

export const GroupButtons = () => {
  const user_id = useSelector(selectorIdUser);
  const dispatch = useAppDispatch();
  const [activeFilterPacks, setActiveFilterPacks] = useState<"my" | "all">("all");

  const [searchParams, setSearchParams] = useSearchParams();
  const URLid = searchParams.get("user_id");
  const URLParams = Object.fromEntries(searchParams);

  // const colorActiveMyButton = URLid ? "#FFFFFF" : "#000000";
  // const colorActiveAllButton = !URLid ? "#FFFFFF" : "#000000";
  // const bgColorMyButton = URLid ? "#366EFF;" : "#FFFFFF";
  // const bgColorAllButton = !URLid ? "#366EFF;" : "#FFFFFF";

    // const colorActiveMyButton = activeFilterPacks === "my" ? "#FFFFFF" : "#000000";
    // const colorActiveAllButton = activeFilterPacks === "all" ? "#FFFFFF" : "#000000";
    // const bgColorMyButton = activeFilterPacks === "my" ? "#366EFF;" : "#FFFFFF";
    // const bgColorAllButton = activeFilterPacks === "all" ? "#366EFF;" : "#FFFFFF";


    console.log("activeFilterPacks", activeFilterPacks)
  const myPacksButtonHandler = () => {
    // const params = { ...URLParams, user_id: user_id };
      setActiveFilterPacks("my")
    const params = { user_id };
      console.log(URLParams)
    setSearchParams(params);
      dispatch(fetchPacksTC({user_id}))
  };

  const allPacksButtonHandler = () => {
      setActiveFilterPacks("all")
    const params = { ...URLParams, user_id: "" };

    setSearchParams(params);
  };

  const buttons = [
    <Button
      onClick={myPacksButtonHandler}
      // classes={activeFilterPacks === "my" ? s.Active : s.NotActive}
      classes={{root: activeFilterPacks === "my" ? s.active : s.notActive}}
      // className={s.Active}
      // sx={{
      // sx={{
      //   border: "1px solid #D9D9D9",
      //   // color: colorActiveMyButton,
      //   // backgroundColor: bgColorMyButton,
      //   // ":hover": {
      //   //   backgroundColor: bgColorMyButton,
      //   // },
      // }}
      key="my"
    >
      My
    </Button>,
    <Button
      onClick={allPacksButtonHandler}
      // classes={{root: activeFilterPacks === "all" ? s.active : s.notActive}}
      className={s.all}
      // className={s.NotActive}
      // sx={{
      //   border: "1px solid #D9D9D9",
      //   // color: colorActiveAllButton,
      //   // backgroundColor: bgColorAllButton,
      //   // ":hover": {
      //   //   backgroundColor: bgColorAllButton,
      //   // },
      // }}
      key="all"
    >
      All
    </Button>,
  ];
  return (
    <div>
      <h2 className={s.title}>Show packs cards</h2>
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
