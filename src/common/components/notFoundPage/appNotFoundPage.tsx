import React from "react";
import notFoundPageImg from "../../img/notFoundPage.png";
import s from "./appNotFoundPage.module.css";
import { useNavigate } from "react-router-dom";
import PATH from "../../constans/path/path";
import { SuperButton } from "../superButton/superButton";

const AppNotFoundPage = () => {
  const navigate = useNavigate();
  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  return (
    <div className={s.textWithButton}>
      <img src={notFoundPageImg} alt="notFoundPageImg" />
      <h2>Ooops!</h2>
      <h3>Sorry!Page not found!</h3>
      <div className={s.button}>
        <SuperButton name={"Back to homepage"} callback={returnToPackHandler} />
      </div>
    </div>
  );
};

export default AppNotFoundPage;
