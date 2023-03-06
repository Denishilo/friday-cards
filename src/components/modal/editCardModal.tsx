import React from "react";
import { ActionModal } from "./actionModal";
import { CreateCard } from "./createCard";
import { ActivateModalPropsType } from "./addNewPackModal";

export const EditCardModal = (props: EditModalPropsType) => {
    return (
        <ActionModal title="Edit card" active={props.active} setActive={props.setActive}>
            <CreateCard
                questionFormat={props.questionFormat}
                mode={"editCard"}
                pack_id={props.pack_id}
                changeName={() => alert("pack")}
                card_id={props.card_id}
                questionTitle={props.questionTitle}
                answer={props.answer}
                active={props.active}
                setActive={props.setActive}
            />
        </ActionModal>
    );
};

type EditModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
    pack_id: string;
    card_id?: string;
    questionTitle: string;
    answer: string;
    questionFormat?:string | undefined
};
