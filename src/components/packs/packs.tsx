import { PacksTable } from "./packsTable/packsTable";
import React, { useState } from "react";
import s from "./packs.module.css";
import { TitleWithButton } from "../../common/components/titleWithButton/titleWithButton";
import "react-loading-skeleton/dist/skeleton.css";
import { AddNewPackModal } from "../modal/addNewPackModal";
import { SettingsParams } from "../settingParams/settingsParams";

export const Packs = () => {
  const [activeAddNewPack, setActiveAddNewPack] = useState(false);

  const addNewPacksHandler = () => {
    setActiveAddNewPack(true);
  };

  return (
    <div className={s.wrapper}>
      <TitleWithButton title={"Packs list"} nameButton={"Add new pack"} callback={addNewPacksHandler} />
      <SettingsParams />
      <PacksTable />
      <AddNewPackModal active={activeAddNewPack} setActive={setActiveAddNewPack} />
    </div>
  );
};
