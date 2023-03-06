import * as React from "react";
import s from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { SuperButton } from "../../common/components/superButton/superButton";
import { useAppDispatch } from "../../app/store";
import { toggleIsSignUp } from "../../app/appReducer";
import { useSelector } from "react-redux";
import PATH from "../../common/constans/path/path";
import { selectorAuth } from "../../app/appSelectors";
import { HeaderDropdown } from "./headerDropdown";

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
        src="https://static.tildacdn.com/tild3064-6361-4562-a539-303563643237/logo-big-blue.png"
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
