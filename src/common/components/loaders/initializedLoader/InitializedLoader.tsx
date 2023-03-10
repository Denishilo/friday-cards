import { CircularProgress } from "@mui/material/";
import React from "react";

export const InitializedLoader = () => {
  return (
    <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
      <CircularProgress />
    </div>
  );
};
