import React from "react";
import { Route, Routes } from "react-router-dom";
import { PATH } from "common/constans";
import { Packs } from "components/packs";
import { Cards } from "components/cards";
import { Profile } from "components/profile";
import { EmptyPageField } from "components/packs";
import { LearnCardPack } from "components/cards";
import { AppNotFoundPage } from "common/components";
import { CheckEmail } from "components/passwordRecovery";
import { CreatePassword } from "components/passwordRecovery";
import { ForgotPassword } from "components/passwordRecovery";
import { LoginRegistration } from "components/loginRegistration";

export const Pages = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Packs />}></Route>
      <Route path={"*"} element={<AppNotFoundPage />}></Route>
      <Route path={PATH.LOGIN} element={<LoginRegistration />}></Route>
      <Route path={PATH.PROFILE} element={<Profile />}></Route>
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />}></Route>
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />}></Route>
      <Route path={PATH.SET_NEW_PASSWORD} element={<CreatePassword />}></Route>
      <Route path={PATH.PACKS} element={<Packs />}></Route>
      <Route path={PATH.EMPTY_PACK} element={<EmptyPageField />}></Route>
      <Route path={PATH.LEARN_PACK} element={<LearnCardPack />}></Route>
      <Route path={PATH.CARDS_LIST} element={<Cards />}></Route>
    </Routes>
  );
};
