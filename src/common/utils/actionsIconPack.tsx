import {useAppDispatch} from "../../app/store";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import s from "./actionsIconPack.module.css";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectorIdUser} from "../../feature/loginRegistration/selectors";
import {EditPackModal} from "../modal/editPackModal";
import {DeletePackModal} from "../modal/deletePackModal";
import PATH from "../constans/path/path";
import { useNavigate } from "react-router-dom";

type ActionsIconPackType = {
  pack_id: string;
  user_id: string;
  pack_name: string;
  cards_count: number;
  deckCover?: string;
  privatePack?: boolean
};

export const ActionsIconPack = ({ user_id, pack_id, pack_name, cards_count, deckCover, privatePack }: ActionsIconPackType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeEditPack, setActiveEditPack] = useState(false);
  const [activeDeletePack, setActiveDeletePack] = useState(false);
  const userAuthId = useSelector(selectorIdUser);
  console.log("ActionIconPack private", privatePack)
  const learnPackCallback = () => {
    if (cards_count === 0) {
      navigate(PATH.EMPTY_PACK);
    } else {
      navigate(`${PATH.LEARN_PACK}/?cardsPack_id=${pack_id}`);
    }
  };
  const editPackModalHandler = () => {
    setActiveEditPack(true);
  };

    const deletePackModalHandler = () => {
        setActiveDeletePack(true);
    };

    return (
        <div className={s.active}>
      <span onClick={learnPackCallback}>
        <SchoolOutlinedIcon/>
      </span>
            <span onClick={editPackModalHandler}>{user_id === userAuthId ? <BorderColorOutlinedIcon/> : null}</span>
            <span className={s.deleteButton} onClick={deletePackModalHandler}>
        {user_id === userAuthId ? <DeleteOutlinedIcon/> : null}
      </span>
      <EditPackModal
        active={activeEditPack}
        setActive={setActiveEditPack}
        pack_id={pack_id}
        pack_name={pack_name}
        deckCover={deckCover}
        privatePack={privatePack}
        user_id={user_id}
      />
      <DeletePackModal
        active={activeDeletePack}
        setActive={setActiveDeletePack}
        pack_id={pack_id}
        pack_name={pack_name}
      />
    </div>
  );
};
