import React, { useEffect } from "react";
import { Header } from "../components/header/header";
import { ErrorSnackbar } from "../common/components/errorSnackbar/errorSnackbar";
import { authMe } from "../components/loginRegistration/authReducer";
import { useAppDispatch } from "./store";
import { Pages } from "./routes";
import { useSelector } from "react-redux";
import { isInitialized } from "./appSelectors";
import { InitializedLoader } from "../common/components/loaders/initializedLoader/InitializedLoader";

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
