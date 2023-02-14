import React, { useEffect } from "react";
import { Header } from "../common/header/header";
import { ErrorSnackbar } from "../common/errorSnackbar/errorSnackbar";
import { authMe } from "../feature/loginRegistration/authReducer";
import { useAppDispatch } from "./store";
import { Pages } from "./routes";
import { InitializedLoader } from "../feature/initializedLoader/InitializedLoader";
import { StatusLoader } from "../feature/statusLoader/statusLoader";
import { useSelector } from "react-redux";
import { selectAppStatus, selectorAppInitialized } from "./appSelectors";
import { SettingsParams } from "../feature/settingParams/settingsParams";
import { PacksList } from "../feature/packs/PacksList";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectorAppInitialized);
  const status = useSelector(selectAppStatus);

  useEffect(() => {
    dispatch(authMe());
  }, []);

  if (!isInitialized) {
    return <InitializedLoader />;
  }

  return (
    <>
      <Header />
      <PacksList PageTitle={"PacksList"} />
      {status === "loading" && <StatusLoader />}
      <Pages />
      <ErrorSnackbar />
      <SettingsParams />
    </>
  );
};

export default App;
