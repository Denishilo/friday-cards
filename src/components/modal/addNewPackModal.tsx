import React, { FC } from "react";
import { ActionModal } from "./actionModal";
import { EditPack } from "./editPack";

export const AddNewPackModal: FC<ActivateModalPropsType> = ({ active, setActive }) => {
  return (
    <ActionModal title="Add new pack" active={active} setActive={setActive}>
      <EditPack active={active} setActive={setActive} />
    </ActionModal>
  );
};

export type ActivateModalPropsType = {
  active: boolean;
  setActive: any;
};
