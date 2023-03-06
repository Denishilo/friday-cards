import React, { FC } from "react";
import { ActionModal } from "./actionModal";
import { CreateCard } from "./createCard";
import { ActivateModalPropsType } from "./addNewPackModal";

export const AddNewCardModal: FC<AddNewCardModalPropsType> = ({ setActive, active, pack_id }) => {
  return (
    <ActionModal title="Add new card" active={active} setActive={setActive}>
      <CreateCard
        mode={"addCard"}
        pack_id={pack_id}
        changeName={() => alert("pack")}
        active={active}
        setActive={setActive}
      />
    </ActionModal>
  );
};

type AddNewCardModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  pack_id?: string;
};
