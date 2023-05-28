import { AppThunkDispatch } from "app/store";
import { authAPI, LoginRequestType, RegistrationRequestType } from "./authAPI";
import { setAppStatus, setAuth, setInitialized, toggleIsSignUp } from "app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "common/functions/utils/errorUtils/errorUtils";

const initialAuthState = {
  isLogin: false,
  user: {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: "",
  },
};

export const authReducer = (state = initialAuthState, action: AuthActionCreatorsType): InitialAuthStateType => {
  switch (action.type) {
    case AuthActions.SetAuthUser:
      return { ...state, isLogin: action.payload.value };
    case AuthActions.SetCurrentUser:
      return { ...state, user: { ...action.payload.user } };
    case AuthActions.UpdateUserName:
      return { ...state, user: { ...state.user, name: action.payload.name } };
    case AuthActions.UpdateUserAvatar:
      return { ...state, user: { ...state.user, avatar: action.payload.avatar } };
    default:
      return state;
  }
};

/////////////////// ACTION CREATORS ///////////////////////
export const setLoginUser = (value: boolean, data?: UserDataType) =>
  ({ type: AuthActions.SetAuthUser, payload: { value, data } } as const);
export const setCurrentUser = (user: UserDataType) =>
  ({ type: AuthActions.SetCurrentUser, payload: { user } } as const);
export const updateName = (name: string) => ({ type: AuthActions.UpdateUserName, payload: { name } } as const);
export const updateAvatar = (avatar: string) => ({ type: AuthActions.UpdateUserAvatar, payload: { avatar } } as const);

/////////////////// THUNK CREATORS ////////////////////////
export const registrationUser = (values: RegistrationRequestType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await authAPI.registration(values);
    dispatch(toggleIsSignUp(false));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const loginUser = (values: LoginRequestType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    let res = await authAPI.login(values);
    dispatch(setLoginUser(true));
    dispatch(setCurrentUser(res.data));
    dispatch(setAuth(true));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const authMe = () => async (dispatch: AppThunkDispatch) => {
  try {
    let res = await authAPI.authMe();
    dispatch(setCurrentUser(res.data));
    dispatch(setLoginUser(true));
    dispatch(setAuth(true));
  } catch (e) {
  } finally {
    dispatch(setInitialized(true));
  }
};

export const logoutUser = () => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  dispatch(setAuth(false));
  try {
    await authAPI.logout();
    dispatch(setLoginUser(false));
    dispatch(setAuth(false));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const updateUserName = (name: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await authAPI.updateUserName(name);
    dispatch(updateName(name));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const updateUserAvatar = (avatar: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await authAPI.updateUserAvatar(avatar);
    dispatch(updateAvatar(avatar));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

//////////// types //////////////
export const AuthActions = {
  SetAuthUser: "SET-AUTH-USER",
  SetCurrentUser: "SET-CURRENT-USER",
  UpdateUserName: "UPDATE-NAME",
  UpdateUserAvatar: "UPDATE-AVATAR",
} as const;

type InitialAuthStateType = typeof initialAuthState;

export type AuthActionCreatorsType =
  | ReturnType<typeof setLoginUser>
  | ReturnType<typeof setCurrentUser>
  | ReturnType<typeof updateName>
  | ReturnType<typeof updateAvatar>;

export type UserDataType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error: string;
};
