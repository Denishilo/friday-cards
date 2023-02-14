import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { appReducer } from "./appReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { authReducer } from "../feature/loginRegistration/authReducer";
import { forgotPasswordReducer } from "../feature/passwordRecovery/forgotPasswordReducer";
import { settingsReducer } from "../feature/settingParams/settingsReducer";
import { packsReducer } from "../feature/packs/packsReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  recoveryPassword: forgotPasswordReducer,
  packs: packsReducer,
  settings: settingsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

////types
export type RootReducerType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootReducerType, any, AnyAction>;

// @ts-ignore
window.store = store;