import axios from "axios";
export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || "https://neko-back.herokuapp.com/2.0/",
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

export const appAPI = {
  recoveryPassword(payload: ForgotRequestType) {
    // return instance.post<RecoveryResponseType>("auth/forgot", payload);
    return axios.post<RecoveryResponseType>("https://neko-back.herokuapp.com/2.0/auth/forgot", payload);
  },
  setNewPassword(newPassword: NewPasswordRequestType) {
    // return instance.post("auth/set-new-password", payload);
    return axios.post<RecoveryResponseType>("https://neko-back.herokuapp.com/2.0/auth/set-new-password", newPassword);
  },
};

/////////////////// types ////////////////////
type RecoveryResponseType = {
  info: string;
  error: string;
};

type ForgotRequestType = {
  email: string;
  from: string;
  message: string;
};

type NewPasswordRequestType = {
  password: string;
  resetPasswordToken: string;
};