import React from "react";
import s from "./password.module.css";
import { PATH } from "common/constans";
import messageIcon from "common/img/MessageIcon.svg";
import { SuperButton } from "common/components";
import { useNavigate } from "react-router-dom";

export const CheckEmail = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    return navigate(PATH.LOGIN);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Check Email</div>
      <img src={messageIcon} alt="messageIcon" className={s.messageIcon} />
      <div className={s.description}>We’ve sent an Email with instructions to example@mail.com</div>
      <SuperButton name={"Back to login"} callback={onClickHandler} />
    </div>
  );
};
