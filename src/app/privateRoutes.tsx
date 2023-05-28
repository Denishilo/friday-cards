import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorAuth } from "./appSelectors";
import React from "react";
import { PATH } from "common/constans";

export const PrivateRoutes = () => {
  const isAuth = useSelector(selectorAuth);
  return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
