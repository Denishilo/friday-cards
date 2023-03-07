import { AppThunkDispatch } from "../../app/store";
import { setAppStatus } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { AddPackParamsType, EditCardPackRequestType, PackResponseType, packsAPI, PacksReturnType } from "./packsAPI";

const initialPacksState = {
  cardPacks: [],
  page: 0,
  pageCount: 4,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  token: "",
  tokenDeathTime: 0,
  isClearSearchField: false,
};

export const packsReducer = (
  state: PacksResponseType = initialPacksState,
  action: PacksActionCreatorsType
): PacksResponseType => {
  switch (action.type) {
    case PacksActions.SetPacks:
      return { ...state, ...action.payload.packs };
    case PacksActions.SetSearchField:
      return { ...state, isClearSearchField: action.payload.value };
    default:
      return state;
  }
};

/////////////////// ACTION CREATORS ///////////////////////
export const setPacksAC = (packs: PacksReturnType) => {
  return { type: PacksActions.SetPacks, payload: { packs } as const };
};
export const setSearchFieldEmpty = (value: boolean) => {
  return { type: PacksActions.SetSearchField, payload: { value } as const };
};

/////////////////// THUNK CREATORS ////////////////////////
export const fetchPacksTC = (params: PackParamsType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    const res = await packsAPI.getPacks(params);
    dispatch(setPacksAC(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const addPackTC = (newPack: AddPackParamsType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await packsAPI.addPack(newPack);
    dispatch(fetchPacksTC({}));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const deletePackTC = (packId: string, user_id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await packsAPI.deletePack(packId);
    await dispatch(fetchPacksTC({ user_id }));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const editPackTC = (cardsPack: EditCardPackRequestType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await packsAPI.editPack(cardsPack);
    // await dispatch(fetchPacksTC({}));
    const params = {
        user_id: cardsPack.cardsPack.user_id
      }
    await dispatch(fetchPacksTC(params));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};
// export type PackParamsType = {
//   packName?: string;
//   min?: number;
//   max?: number;
//   sortPacks?: string;
//   page?: number;
//   pageCount?: number;
//   user_id?: string;
//   block?: boolean;
// };
/////////// types /////////////
export type PacksResponseType = {
  cardPacks: Array<PackResponseType>;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
  isClearSearchField: boolean;
};

export const PacksActions = {
  SetPacks: "SET-PACKS",
  SetSearchField: "SET_SEARCH_FIELD",
} as const;

export type PackParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};
export type PacksActionCreatorsType = ReturnType<typeof setPacksAC> | ReturnType<typeof setSearchFieldEmpty>;
