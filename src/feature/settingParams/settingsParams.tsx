import { SearchField } from "./searchField/searchField";
import s from "./SettingParams.module.css";
import { GroupButtons } from "./buttonGroup/buttonGroup";
import { SliderField } from "./sliderField/SliderField";
import { ClearButton } from "./clearButton/clearButton";
import { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {selectorIsClearSearchField, selectorMax, selectorMin} from "../packs/packsSelectors";

export const SettingsParams = () => {
    const minValue = useSelector(selectorMin);
    const maxValue = useSelector(selectorMax);
    const [value, setValue] = useState([0, 0]);
    const isClearField = useSelector(selectorIsClearSearchField);

    useEffect(() => {
        setValue([minValue, maxValue]);
    }, [isClearField, minValue, maxValue]);
    return (
        <div className={s.wrapper}>
            <SearchField />
            <GroupButtons />
            <SliderField minValue={minValue} maxValue={maxValue} value={value} setValue={setValue} />
            <ClearButton />
        </div>
    );
};
