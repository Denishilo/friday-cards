import { Route, Routes } from "react-router-dom";
import PATH from "../common/constans/path/path";
import { LoginRegistration } from "../components/loginRegistration/loginRegistration";
import { Profile } from "../components/profile/profile";
import { CheckEmail } from "../components/passwordRecovery/checkEmail";
import { CreatePassword } from "../components/passwordRecovery/createPassword";
import React from "react";
import { ForgotPassword } from "../components/passwordRecovery/forgotPassword";
import { Packs } from "../components/packs/packs";
import { Cards } from "../components/cards/cards";
import { EmptyPageField } from "../components/packs/emptyPageField";
import { LearnCardPack } from "../components/cards/learnCards/learnCardPack";
import AppNotFoundPage from "../common/components/notFoundPage/appNotFoundPage";
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
      <Route path={PATH.CARDS_LIST} element={<Cards />}></Route>
    </Routes>
  );
};

// export const Pages = () => {
//     return (
//         <Routes>
//             <Route path={PATH.LOGIN} element={<LoginRegistration/>}></Route>
//             <Route element={<PrivateRoutes/>}>
//                 <Route path={PATH.PROFILE} element={<Profile/>}></Route>
//                 <Route path={"/"} element={<Packs/>}></Route>
//                 <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}></Route>
//                 <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}></Route>
//                 <Route path={PATH.SET_NEW_PASSWORD} element={<CreatePassword/>}></Route>
//                 <Route path={PATH.PACKS} element={<Packs/>}></Route>
//                 <Route path={PATH.EMPTY_PACK} element={<EmptyPageField/>}></Route>
//                 <Route path={PATH.LEARN_PACK_BY_ID} element={<LearnCardPack/>}></Route>
//                 <Route path={PATH.CARDS_LIST_BY_ID} element={<Cards/>}></Route>
//             </Route>
//         </Routes>
//     );
// };
