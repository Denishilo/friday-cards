import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorAuth } from "./appSelectors";
import React, { useEffect, useState } from "react";

export const PrivateRoutes = () => {
  const isAuth = useSelector(selectorAuth);
  const [res, setRes] = useState(<></>);
  useEffect(() => {
    let timer = setTimeout(() => {
      if (isAuth) {
        setRes(
          <div>
            <Outlet />
          </div>
        );
      }
      if (!isAuth) {
        setRes(
          <div>
            <Navigate to="/login" />
          </div>
        );
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isAuth]);

  return <div>{res}</div>;
};
