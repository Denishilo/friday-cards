import { DataRows } from "../../components/packs/packsTable/packsTable";
import { DataCards } from "../../components/cards/cardsTable/cardsTable";

export const headCells: readonly HeadCell[] = [
  {
    id: "deckCover",
    numeric: false,
    disablePadding: true,
    label: "Deck cover",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "cards",
    numeric: true,
    disablePadding: false,
    label: "Cards",
  },
  {
    id: "lastUpdated",
    numeric: true,
    disablePadding: false,
    label: "Last Updated",
  },
  {
    id: "createdBy",
    numeric: true,
    disablePadding: false,
    label: "Created by",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

export const headCellsCards: readonly HeadCellCards[] = [
  {
    id: "question",
    numeric: false,
    disablePadding: true,
    label: "Question",
  },
  {
    id: "answer",
    numeric: true,
    disablePadding: false,
    label: "Answer",
  },
  {
    id: "lastUpdated",
    numeric: true,
    disablePadding: false,
    label: "Last Updated",
  },
  {
    id: "grade",
    numeric: true,
    disablePadding: false,
    label: "Grade",
  },
];

///////types/////
interface HeadCell {
  disablePadding: boolean;
  id: keyof DataRows;
  label: string;
  numeric: boolean;
}

export type HeadCellCards = {
  disablePadding: boolean;
  id: keyof DataCards;
  label: string;
  numeric: boolean;
};
