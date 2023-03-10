import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "components/header";
import { useAppDispatch } from "./store";
import { Pages } from "./routes";
import { ErrorSnackbar } from "common/components";
import { isInitialized } from "./appSelectors";
import { InitializedLoader } from "common/components";
import { authMe } from "components/loginRegistration/authReducer";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitializedApp = useSelector(isInitialized);

  useEffect(() => {
    dispatch(authMe());
  }, []);

  if (!isInitializedApp) {
    return <InitializedLoader />;
  }

  return (
    <>
      <Header />
      <Pages />
      <ErrorSnackbar />
    </>
  );
};

export default App;
