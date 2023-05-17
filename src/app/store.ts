import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { appReducer } from "./appReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { authReducer } from "components/loginRegistration/authReducer";
import { forgotPasswordReducer } from "components/passwordRecovery/forgotPasswordReducer";
import { packsReducer } from "components/packs/packsReducer";
import { cardsReducer } from "components/cards/cardsReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  recoveryPassword: forgotPasswordReducer,
  cards: cardsReducer,
  packs: packsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

////types
export type RootReducerType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootReducerType, any, AnyAction>;

// @ts-ignore
window.store = store;
