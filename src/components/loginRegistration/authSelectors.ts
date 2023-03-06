import { RootReducerType } from "../../app/store";

export const selectorLogin = (state: RootReducerType) => state.auth.isLogin;
export const selectorIdUser = (state: RootReducerType) => state.auth.user._id;
