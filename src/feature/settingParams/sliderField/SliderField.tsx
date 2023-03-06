// import * as React from "react";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import s from "../searchField/SearchField.module.css";
// import styles from "./SliderField.module.css";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { selectorIsClearSearchField, selectorMax, selectorMin } from "../../packs/packsSelectors";
// import { useSearchParams } from "react-router-dom";
//
// export const SliderField = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const URLParams = Object.fromEntries(searchParams);
//   const isClearField = useSelector(selectorIsClearSearchField);
//   const minValue = useSelector(selectorMin);
//   const maxValue = useSelector(selectorMax);
//
//   useEffect(() => {
//     setValue([Number(searchParams.get("min")) || minValue, Number(searchParams.get("max")) || maxValue]);
//   }, [isClearField, minValue, maxValue]);
//
//   const [value, setValue] = useState([
//     Number(searchParams.get("min")) || minValue,
//     Number(searchParams.get("max")) || maxValue,
//   ]);
//   console.log("slider value", value);
//   const handlerChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
//     setValue(newValue as number[]);
//     const params = { ...URLParams, min: String(value[0]), max: String(value[1]) };
//     setSearchParams(params);
//   };
//   const handlerChange = (event: Event, newValue: number | number[]) => {
//     console.log("Change slider");
//     setValue(newValue as number[]);
//   };
//
//   return (
//     <div>
//       <h2 className={s.title}>Number of cards</h2>
//       <div className={styles.sliderWrapper}>
//         <div className={styles.numberWrapper}>
//           <div className={styles.spanNumber}>{value[0]}</div>
//         </div>
//         <Box sx={{ width: 155 }}>
//           <Slider
//             value={value}
//             onChange={handlerChange}
//             onChangeCommitted={handlerChangeCommitted}
//             valueLabelDisplay="auto"
//           />
//         </Box>
//         <div className={styles.numberWrapper}>
//           <span className={styles.spanNumber}>{value[1]}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import s from "../searchField/SearchField.module.css";
import styles from "./SliderField.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectorIsClearSearchField } from "../../packs/packsSelectors";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";

type PropsType = {
  minValue: number;
  maxValue: number;
  value: number[];
  setValue: any;
};

export const SliderField = ({ minValue, maxValue, value, setValue }: PropsType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const URLParams = Object.fromEntries(searchParams);
  const isClearField = useSelector(selectorIsClearSearchField);
  const dispatch = useAppDispatch();

  console.log("searchParams", searchParams);
  console.log("URLParams", URLParams);
  ///

  // const [minPacks, setMinPacks] = useState<number>(+minValue);
  // const [maxPacks, setMaxPacks] = useState<number>(+maxValue);
  // const [value, setValue] = useState([minPacks, maxPacks]);

  ///
  // const maxValue = useSelector(selectorMax);
  // const [value, setValue] = useState([minPacks, maxPacks]);
  console.log("minValue", minValue);
  console.log("maxValue", maxValue);

  const onChangeMinPacks = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.currentTarget.value);
    setValue([e.currentTarget.value, value[1]]);
    // setValue([minPacks, maxPacks]);
    const params = { ...URLParams, min: String(e.currentTarget.value), max: String(value[1]) };
    setSearchParams(params);
  };

  const onChangeMaxPacks = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.currentTarget.value);
    // setValue([minPacks, maxPacks]);
    setValue([value[0], e.currentTarget.value]);
    const params = { ...URLParams, min: String(value[0]), max: String(e.currentTarget.value) };
    setSearchParams(params);
  };

  useEffect(() => {
    setValue([minValue, maxValue]);
  }, [isClearField, minValue, maxValue]);

  const handlerChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log("value", value);
    // const params = { ...URLParams, min: String(minPacks), max: String(maxPacks) };
    const params = { ...URLParams, min: String(value[0]), max: String(value[1]) };
    setSearchParams(params);
    console.log("params", params);
    console.log("searchParams", searchParams);
  };
  const handlerChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
      <div>
        <h2 className={s.title}>Number of cards</h2>
        <div className={styles.sliderWrapper}>
          {/*  <div className={styles.numberWrapper}>*/}
          {/*    <div className={styles.spanNumber}>{value[0]}</div>*/}
          <input type="text" className={styles.numberWrapper} value={value[0]} onChange={onChangeMinPacks}></input>
          {/*</div>*/}
          <Box sx={{ width: 155 }}>
            <Slider
                value={value}
                onChange={handlerChange}
                onChangeCommitted={handlerChangeCommitted}
                valueLabelDisplay="auto"
                min={minValue}
                max={maxValue}
            />
          </Box>
          {/*<div className={styles.numberWrapper}>*/}
          <input type="text" className={styles.numberWrapper} value={value[1]} onChange={onChangeMaxPacks}></input>
          {/*<span>{value[1]}</span>*/}
          {/*</div>*/}

          {/*<div className={styles.numberWrapper}>*/}
          {/*  <span className={styles.spanNumber}>{value[1]}</span>*/}
          {/*</div>*/}
        </div>
      </div>
  );
};
