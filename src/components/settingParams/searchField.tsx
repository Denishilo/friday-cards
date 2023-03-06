import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import s from "./settingParams.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store";
import { setSearchFieldEmpty } from "../packs/packsReducer";
import { useSelector } from "react-redux";
import { selectorIsClearSearchField } from "../packs/packsSelectors";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../common/functions/useDebounce";

const Search = styled("div")(({ theme }) => ({
  border: "solid 1px #DEDBDC",
  position: "relative",
  borderRadius: "5px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "413px",
    margin: "0px",
    backgroundColor: "#FFFFFF",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  paddingLeft: "16px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ADABAC",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing("12px", 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
  width: "100%",
}));

export const SearchField = () => {
  const dispatch = useAppDispatch();
  const isClearField = useSelector(selectorIsClearSearchField);
  const [isClear, setClear] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const URLParams = Object.fromEntries(searchParams);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedValue = useDebounce(searchText, 800);

  useEffect(() => {
    if (isClearField) {
      setSearchText("");
      dispatch(setSearchFieldEmpty(false));
    }
  }, [isClearField]);

  useEffect(() => {
    if (isClear) {
      const params = { ...URLParams, packName: debouncedValue };
      setSearchParams(params);
      setClear(false);
    }
  }, [debouncedValue]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    setClear(true);
  };
  return (
    <div className={s.wrapperSearchField}>
      <h2 className={s.titleSearchField}>Search</h2>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={searchText}
          placeholder="Provide your text"
          inputProps={{ "aria-label": "search" }}
          onChange={onChangeHandler}
        />
      </Search>
    </div>
  );
};
