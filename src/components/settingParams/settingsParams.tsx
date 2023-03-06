import { SearchField } from "./searchField";
import s from "./settingParams.module.css";
import { GroupButtons } from "./buttonGroup";
import { SliderField } from "./sliderField";
import { ClearButton } from "./clearButton";
import { memo } from "react";

export const SettingsParams = memo(() => {
  return (
    <div className={s.wrapper}>
      <SearchField />
      <GroupButtons />
      <SliderField />
      <ClearButton />
    </div>
  );
});
