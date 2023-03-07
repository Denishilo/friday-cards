import React from "react";
import { ActionModal } from "./actionModal";

import { AddOrEditPack } from "./addOrEditPack";
import { ActivateModalPropsType } from "./addNewPackModal";
import { EditPack } from "./editPack";

export const EditPackModal = (props: EditPackModalPropsType) => {
  return (
    <ActionModal title="Edit pack" active={props.active} setActive={props.setActive}>
      <EditPack
        pack_id={props.pack_id}
        pack_name={props.pack_name}
        active={props.active}
        setActive={props.setActive}
        deckCover={props.deckCover}
        privatePack={props.privatePack}
        user_id={props.user_id}
      />
    </ActionModal>
  );
};

type PackIdType = {
  pack_id: string;
  pack_name: string;
  deckCover?: string;
  privatePack?: boolean;
  user_id?: string
};

type EditPackModalPropsType = ActivateModalPropsType & PackIdType;
