import axios from "axios";

export const instanceHeroku = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

export const appAPI = {
  recoveryPassword(payload: ForgotRequestType) {
    return instanceHeroku.post<RecoveryResponseType>("auth/forgot", payload);
  },
  setNewPassword(newPassword: NewPasswordRequestType) {
    return instanceHeroku.post<RecoveryResponseType>("auth/set-new-password", newPassword);
  },
};

/////////////////// types ////////////////////
type ForgotRequestType = {
  email: string;
  from: string;
  message: string;
};

type RecoveryResponseType = {
  info: string;
  error: string;
};

type NewPasswordRequestType = {
  password: string;
  resetPasswordToken: string;
};
