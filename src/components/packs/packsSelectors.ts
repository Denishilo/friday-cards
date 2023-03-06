import { RootReducerType } from "../../app/store";

export const selectorPacks = (state: RootReducerType) => state.packs;
export const selectorMin = (state: RootReducerType) => state.packs.minCardsCount;
export const selectorMax = (state: RootReducerType) => state.packs.maxCardsCount;
export const selectorPacksTotalCount = (state: RootReducerType) => state.packs.cardPacksTotalCount;
export const selectorIsClearSearchField = (state: RootReducerType) => state.packs.isClearSearchField;
