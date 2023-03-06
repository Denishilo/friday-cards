import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { setAppError, SetAppErrorType } from "../../../../app/appReducer";

export const errorUtils = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch<SetAppErrorType>) => {
  if (axios.isAxiosError(e)) {
    const error = e.response?.data ? e.response.data.error : e.message;
    dispatch(setAppError(error));
  } else {
    dispatch(setAppError(`Native error ${e.message}`));
  }
};
