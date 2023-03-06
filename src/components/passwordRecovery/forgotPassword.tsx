import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import s from "./password.module.css";
import { useAppDispatch } from "../../app/store";
import { recoveryPasswordTC } from "./forgotPasswordReducer";
import { SuperButton } from "../../common/components/superButton/superButton";
import { NavLink, useNavigate } from "react-router-dom";
import PATH from "../../common/constans/path/path";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<null | string>("");

  const navigate = useNavigate();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setError("");
  };

  const sendRecoveryPasswordInstructions = async () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError("Invalid email address");
    } else {
      await dispatch(recoveryPasswordTC(email));
      navigate(PATH.CHECK_EMAIL);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Forgot your password?</div>
      <TextField label="Email" variant="standard" className={s.textFieldForgot} onChange={onChangeHandler} fullWidth />
      {error && <div className={s.errorMessage}>{error}</div>}
      <div className={s.description}>Enter your email address and we will send you further instructions</div>
      <SuperButton name={"Send Instructions"} callback={sendRecoveryPasswordInstructions} />
      <div className={s.rememberPassword}>Did you remember your password?</div>
      <div className={s.link}>
        <NavLink className={s.linkTry} to={PATH.LOGIN}>
          Try logging in
        </NavLink>
      </div>
    </div>
  );
};
