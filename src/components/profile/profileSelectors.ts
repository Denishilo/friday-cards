import { RootReducerType } from "../../app/store";

export const selectUserName = (state: RootReducerType) => state.auth.user.name;
export const selectUserEmail = (state: RootReducerType) => state.auth.user.email;
export const selectUserAvatar = (state: RootReducerType) => state.auth.user.avatar;
