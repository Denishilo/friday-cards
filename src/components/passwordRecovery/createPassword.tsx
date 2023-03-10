import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import s from "./password.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePasswordTC } from "./forgotPasswordReducer";
import { SuperButton } from "common/components";
import { useAppDispatch } from "app/store";
import { useNavigate } from "react-router-dom";
import { PATH } from "common/constans/path/path";

export const CreatePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (event.key === "Enter") {
      sendNewPassword();
    }
  };

  const sendNewPassword = async () => {
    if (password.length < 7) {
      setError("Password length should be more then 7 symbols");
      setPassword("");
    } else {
      await dispatch(changePasswordTC(password));
      navigate(PATH.LOGIN);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Create new password</div>
      <form>
        <FormControl fullWidth variant="standard" className={s.textField}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={onChangePasswordHandler}
            onKeyDown={onKeyDownHandler}
            error={!!error}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {error && <div className="error-message">{error}</div>}
        <div className={s.textFieldCreate}>Create new password and we will send you further instructions to email</div>
        <SuperButton name={"Create new password"} callback={sendNewPassword} />
      </form>
    </div>
  );
};
