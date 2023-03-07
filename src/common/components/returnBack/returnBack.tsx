import { Stack } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React, { FC } from "react";

export const ReturnBack: FC<ReturnBackPropsType> = ({ callback, type = "packs" }) => {
  return (
    <Stack onClick={callback} direction="row" spacing={1} sx={{ cursor: "pointer" }}>
      <KeyboardBackspaceIcon fontSize={"small"} />
      <span>Back to {type} list</span>
    </Stack>
  );
};

export type ReturnBackPropsType = {
  callback: () => void;
  type?: "Cards" | "Packs";
};
