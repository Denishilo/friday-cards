import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import styles from "./SliderField.module.css";
import {ChangeEvent, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { selectorIsClearSearchField } from "../../packs/packsSelectors";
import { useSearchParams } from "react-router-dom";
import {useDebounce} from "../../../common/functions/useDebounce";

export const SliderField = ({ minValue, maxValue, value, setValue }: PropsType) => {
  // const isClearField = useSelector(selectorIsClearSearchField);
  const [minPacks, setMinPacks] = useState(0)
  const [maxPacks, setMaxPacks] = useState(0)
  const debouncedMinPacksValue = useDebounce(String(minPacks));
  const debouncedMaxPacksValue = useDebounce(String(maxPacks));
  const [searchParams, setSearchParams] = useSearchParams();
  let URLParams = Object.fromEntries(searchParams);

  useEffect(() => {
    // setValue([minValue, maxValue]);
    // URLParams = Object.fromEntries(searchParams);
  // }, [isClearField, minValue, maxValue, searchParams]);
  //     const params = {...URLParams, min: debouncedMinPacksValue, max: debouncedMaxPacksValue === '0' ? String(value[1]) : debouncedMaxPacksValue}
      const params = {...URLParams, min: String(value[0]), max: String(value[1])}
      setSearchParams(params)
  // }, [isClearField, debouncedMinPacksValue, debouncedMaxPacksValue]);
  }, [debouncedMinPacksValue, debouncedMaxPacksValue]);

  const onChangeMinPacks = (e: ChangeEvent<HTMLInputElement>) => {
    setValue([e.currentTarget.value, value[1]]);
    // setSearchParams({...URLParams, min: debouncedMinPacksValue, max: String(value[1])})
    // const params = { ...URLParams, min: debouncedMinPacksValue, max: String(value[1]) };
    // setSearchParams(params);
    setMinPacks(Number(e.currentTarget.value))
  };

  const onChangeMaxPacks = (e: ChangeEvent<HTMLInputElement>) => {
    setValue([value[0], e.currentTarget.value]);
    // const params = { ...URLParams, min: String(value[0]), max: String(e.currentTarget.value) };
    setMaxPacks(Number(e.currentTarget.value))
    // const params = { ...URLParams, min: debouncedMinPacksValue, max: String(e.currentTarget.value) };
    // setSearchParams(params);
  };

  const handlerChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    const params = { ...URLParams, min: String(value[0]), max: String(value[1]) };
    setSearchParams(params);
  };
  const handlerChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
      <div>
        <h2 className={styles.title}>Number of cards</h2>
        <div className={styles.sliderWrapper}>
          <input type="number" className={styles.packsNumberInput} value={value[0]} onChange={onChangeMinPacks} onFocus={(e) => e.target.select()}></input>
          <Box className={styles.sliderBox}>
            <Slider
                value={value}
                onChange={handlerChange}
                onChangeCommitted={handlerChangeCommitted}
                valueLabelDisplay="auto"
                min={minValue}
                max={maxValue}
            />
          </Box>
          <input type="text" className={styles.packsNumberInput} value={value[1]} onChange={onChangeMaxPacks} onFocus={(e) => e.target.select()}></input>
        </div>
      </div>
  );
};


type PropsType = {
  minValue: number;
  maxValue: number;
  value: number[];
  setValue: any;
};