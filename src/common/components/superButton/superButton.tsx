import Button from "@mui/material/Button";
import React from "react";
import { useAppSelector } from "app/store";
import { RequestStatusType } from "app/appReducer";

export const SuperButton: React.FC<SuperButtonPropsType> = ({ name, callback }) => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  return (
    <Button
      disabled={status === "loading"}
      onClick={callback}
      fullWidth
      type={"submit"}
      variant={"contained"}
      color={"primary"}
      sx={{ borderRadius: "30px", textTransform: "none" }}
    >
      {name}
    </Button>
  );
};

/////////////////// types //////////////////////

export type SuperButtonPropsType = {
  name: string;
  callback?: () => void;
  disabled?: boolean;
};
