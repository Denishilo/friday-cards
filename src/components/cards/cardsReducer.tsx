import { AppThunkDispatch } from "../../app/store";
import { setAppStatus } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../common/functions/utils/errorUtils/errorUtils";
import {
  CardParamsType,
  cardsAPI,
  CardsType,
  EditCardRequestType,
  NewCardRequestType,
  UpdateGradeCardType,
} from "./cardsAPI";

const initialCardsState = {} as CardStateType;

export const cardsReducer = (state = initialCardsState, action: CardsActionCreatorsType): CardStateType => {
  switch (action.type) {
    case CardsActions.GetCards:
      return { ...action.payload.cards };
    default:
      return state;
  }
};

/////////////////// ACTION CREATORS ///////////////////////

export const getCards = (cards: CardStateType) => {
  return { type: CardsActions.GetCards, payload: { cards } } as const;
};

/////////////////// THUNK CREATORS ////////////////////////

export const getCardsTC = (params: CardParamsType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    const res = await cardsAPI.getCards(params);
    dispatch(getCards(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("idle"));
  }
};

export const addNewCardTC = (newCard: NewCardRequestType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await cardsAPI.addCard(newCard);
    await dispatch(getCardsTC({ cardsPack_id: newCard.card.cardsPack_id }));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const editCardTC = (editCard: EditCardRequestType, pack_id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await cardsAPI.editCard(editCard);
    await dispatch(getCardsTC({ cardsPack_id: pack_id }));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const deleteCardTC = (card_id: string, pack_id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await cardsAPI.deleteCard(card_id);
    await dispatch(getCardsTC({ cardsPack_id: pack_id }));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const updateGradeCardTC = (updateGradeCard: UpdateGradeCardType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await cardsAPI.updateGradeCard(updateGradeCard);
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

//////////// types //////////////

export type CardStateType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packCreated: string;
  packName: string;
  packPrivate: boolean;
  packUpdated: string;
  packUserId: string;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: string;
};

export const CardsActions = {
  GetCards: "GET-CARDS",
} as const;

export type CardsActionCreatorsType = ReturnType<typeof getCards>;

// const initialCardsState = {
//     cards: [],
//     params: {
//         cardAnswer: "",
//         cardQuestion: "",
//         cardsPack_id: "",
//         min: 0,
//         max: 0,
//         sortCards: "0grade",
//         page: 1,
//         pageCount: 4,
//     },
//     cardsTotalCount: 0,
//     maxGrade: 0,
//     minGrade: 0,
//     packCreated: '',
//     packName: '',
//     packPrivate: false,
//     packUpdated: '',
//     packUserId: '',
//     page: 1,
//     pageCount: 4,
//     token: '',
//     tokenDeathTime: '',
// };
// export type editCardType = {
//     card: {
//         _id: string;
//         question: string;
//         answer: string;
//         answerImg?: string,
//         questionImg?: string
//     };
// };
