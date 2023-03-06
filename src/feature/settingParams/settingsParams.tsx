import { SearchField } from "./searchField/searchField";
import s from "./SettingParams.module.css";
import { GroupButtons } from "./buttonGroup/buttonGroup";
import { SliderField } from "./sliderField/SliderField";
import { ClearButton } from "./clearButton/clearButton";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { selectorMax, selectorMin } from "../packs/packsSelectors";

export const SettingsParams = () => {
    ////
    const minValue = useSelector(selectorMin);
    const maxValue = useSelector(selectorMax);
    const [value, setValue] = useState([minValue, maxValue]);
    ////
    return (
        <div className={s.wrapper}>
            <SearchField />
            <GroupButtons />
            {/*<SliderField*/}
            <SliderField minValue={minValue} maxValue={maxValue} value={value} setValue={setValue} />
            <ClearButton />
        </div>
    );
};
