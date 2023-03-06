import { Stack } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";

export const ReturnBack = ({ callback }: ReturnBackPropsType) => {
  return (
    <Stack onClick={callback} direction="row" spacing={1} sx={{ cursor: "pointer" }}>
      <KeyboardBackspaceIcon fontSize={"small"} />
      <span>Back to Packs List</span>
    </Stack>
  );
};

export type ReturnBackPropsType = {
  callback: () => void;
};
