import s from "./loginRegistration.module.css";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormik } from "formik";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/store";
import { toggleIsSignUp } from "app/appReducer";
import { loginUser, registrationUser } from "./authReducer";
import { SuperButton } from "common/components";
import { PATH } from "common/constans";
import { useSelector } from "react-redux";
import { selectorAuth, selectorSignUp } from "app/appSelectors";

export const LoginRegistration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSignUp = useSelector(selectorSignUp);
  const isAuth = useSelector(selectorAuth);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const errors: ErrorsType = {};
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
    validate: (values) => {
      if (!values.email) {
        errors.email = "Required";
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (values.password.length < 7) {
        errors.password = "Password must be more than 7 characters...";
      }
      if (!values.confirmPassword && isSignUp) {
        errors.confirmPassword = "Required";
      }
      if (isSignUp && values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password doesn't match";
      }
      return errors;
    },
    async onSubmit(values) {
      if (isSignUp) {
        const { confirmPassword, rememberMe, ...restValues } = values;
        await dispatch(registrationUser(restValues));
      }
      if (!isSignUp) {
        const { confirmPassword, ...restValues } = values;
        await dispatch(loginUser(restValues));
        navigate(PATH.PACKS);
      }
    },
  });

  const onClickHandler = () => {
    if (!isSignUp) {
      dispatch(toggleIsSignUp(true));
    } else {
      dispatch(toggleIsSignUp(false));
    }
  };

  if (isAuth) {
    return <Navigate to={PATH.PACKS} />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h2 className={s.title}>Sign {isSignUp ? "up" : "in"}</h2>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth className={s.formWrapper}>
            <TextField variant="standard" label="Email" fullWidth {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}

            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                {...formik.getFieldProps("password")}
                id="standard-adornment-password1"
                type={showPassword ? "text" : "password"}
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
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
            {isSignUp && (
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password2">Confirm password</InputLabel>
                <Input
                  {...formik.getFieldProps("confirmPassword")}
                  id="standard-adornment-password"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
            {isSignUp && formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
            )}
            {!isSignUp && (
              <div>
                <FormControlLabel
                  className={s.checkboxSection}
                  label={"Remember me"}
                  control={<Checkbox />}
                  {...formik.getFieldProps("rememberMe")}
                  checked={formik.values.rememberMe}
                />
                <div className={s.linkToPassword}>
                  <NavLink to={PATH.FORGOT_PASSWORD}>Forgot Password?</NavLink>
                </div>
              </div>
            )}
            <div className={s.wrapperButton}>
              <SuperButton name={`Sign ${isSignUp ? "Up" : "In"}`} />
            </div>
          </FormControl>
        </form>
        <div className={s.links}>
          <span>Already have an account?</span>
          <div className={s.signUpLink} onClick={onClickHandler}>
            Sign {isSignUp ? "in" : "Up"}
          </div>
        </div>
      </div>
    </div>
  );
};

////////////////////////// types //////////////////////////

type ErrorsType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};
