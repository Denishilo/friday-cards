import { instanceHeroku } from "app/appAPI";
import { PackParamsType } from "./packsReducer";

export const packsAPI = {
  getPacks(params: PackParamsType) {
    return instanceHeroku.get<PacksReturnType>("/cards/pack", { params });
  },
  addPack(newPack: AddPackParamsType) {
    return instanceHeroku.post<PackResponseType>("/cards/pack", newPack);
  },
  deletePack(id: string) {
    return instanceHeroku.delete(`/cards/pack?id=${id}`);
  },
  editPack(editCardPack: EditCardPackRequestType) {
    return instanceHeroku.put<PackResponseType>(`/cards/pack`, editCardPack);
  },
};

///////// types /////////////
export type GetPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};

export type AddPackParamsType = {
  cardsPack: {
    name?: string;
    deckCover?: string;
    private?: boolean;
  };
};

export type PackResponseType = {
  _id: string;
  user_id: string;
  user_name: string;
  name: string;
  private: boolean;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  deckCover?: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};

export type PacksReturnType = {
  cardPacks: PackResponseType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};
export type EditCardPackRequestType = {
  cardsPack: {
    _id: string;
    name: string;
    deckCover?: string;
  };
};
