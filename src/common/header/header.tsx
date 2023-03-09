import * as React from "react";
import s from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { SuperButton } from "../superButton/superButton";
import { useAppDispatch } from "../../app/store";
import { toggleIsSignUp } from "../../app/appReducer";
import { useSelector } from "react-redux";
import PATH from "../constans/path/path";
import { selectorAuth } from "../../app/appSelectors";
import { HeaderDropdown } from "./headerDropdown";
import learnMyPacksLogo from "./../../img/LearnMyCardsMainLogo.png"

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectorAuth);

  const goToSignIn = () => {
    dispatch(toggleIsSignUp(false));
    return navigate(PATH.LOGIN);
  };

  return (
    <div className={s.topNav}>
      <img
        className={s.mainLogo}
        src={learnMyPacksLogo}
        alt="header_logo"
      />
      <div>
        {isAuth ? (
          <HeaderDropdown />
        ) : (
          <div className={s.button}>
            <SuperButton name={"Sign in"} callback={goToSignIn} />
          </div>
        )}
      </div>
    </div>
  );
};
