import { instanceHeroku } from "../../app/appAPI";
import { UserDataType } from "./authReducer";

export const authAPI = {
  registration(values: RegistrationRequestType) {
    return instanceHeroku.post<ResponseRegistrationType>("/auth/register", values);
  },
  login(values: LoginRequestType) {
    return instanceHeroku.post<UserDataType>("/auth/login", values);
  },
  authMe() {
    return instanceHeroku.post<UserDataType>("/auth/me");
  },
  logout() {
    return instanceHeroku.delete<LogOutResponse>("/auth/me");
  },
  updateUserName(name: string) {
    return instanceHeroku.put<ResponseUpdateUserNameAvatar>("/auth/me", { name });
  },
  updateUserAvatar(avatar: string) {
    return instanceHeroku.put<ResponseUpdateUserNameAvatar>("/auth/me", { avatar });
  },
};
////////////////////////// types /////////////////////////////

export type RegistrationRequestType = {
  email: string;
  password: string;
};
type ResponseRegistrationType = {
  addedUser: {};
  error?: string;
};

export type LoginRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LogOutResponse = {
  info: string;
  error: string;
};

type ResponseUpdateUserNameAvatar = {
  updatedUser: UserDataType;
  error?: string;
};
