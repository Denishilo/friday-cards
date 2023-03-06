import { appAPI } from "../../app/appAPI";
import { AppThunkDispatch } from "../../app/store";
import { AxiosError } from "axios";
import { errorUtils } from "../../common/functions/utils/errorUtils/errorUtils";
import { setAppStatus } from "../../app/appReducer";
import PATH from "../../common/constans/path/path";

const initialState = {
  isNewPasswordSet: false,
};

export const forgotPasswordReducer = (
  state: InitialStateType = initialState,
  action: PasswordActionsType
): InitialStateType => {
  switch (action.type) {
    case ForgotPasswordActionType.SetNewPassword:
      return { ...state, isNewPasswordSet: !state.isNewPasswordSet };
    default:
      return state;
  }
};
////////////////// ACTION CREATORS /////////////////////

export const setNewPassword = () => ({ type: ForgotPasswordActionType.SetNewPassword } as const);

////////////////// THUNK CREATORS ////////////////////////

export const recoveryPasswordTC = (email: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  const payload = {
    email: email,
    from: `test-front-admin <ai73a@yandex.by>`,
    message: `<div style="background-color: lime; padding: 15px"> 
                password recovery link: <a href=http://localhost:3000${PATH.SET_NEW_PASSWORD}token>link</a>
                </div>`,
  };
  try {
    await appAPI.recoveryPassword(payload);
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const changePasswordTC = (password: string) => async (dispatch: AppThunkDispatch) => {
  // const { token } = useParams<{ token: string }>();

  dispatch(setAppStatus("loading"));
  const URL = window.location.href;
  const resetPasswordToken = URL.replace(/^.*[\\\/]/, "");
  const newPassword = {
    password: password,
    resetPasswordToken: resetPasswordToken,
  };
  try {
    await appAPI.setNewPassword(newPassword);
    dispatch(setNewPassword());
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

/////////////// types //////////////////////
type InitialStateType = typeof initialState;

export type PasswordActionsType = ReturnType<typeof setNewPassword>;

const ForgotPasswordActionType = {
  SetNewPassword: "SET-NEW-PASSWORD",
} as const;
