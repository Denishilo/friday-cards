import React, {useState} from "react";
import {Box, MenuItem, TextField} from "@mui/material";
import s from "./actionModal.module.css";

const currencies = [
    {
        value: "Text",
        label: "Text",
    },
    {
        value: "Img",
        label: "Img",
    },
    // {
    //     value: "Audio",
    //     label: "Audio",
    // },
    // {
    //     value: "Video",
    //     label: "Video",
    // },
];

type PropsType = {
    changeQuestionFormat:(fileFormat:string)=> void;
    questionFormat?:string| undefined
}

export const SelectQuestion = (props:PropsType) => {
    return (
        <div className={s.selectQuestion}>
            <Box component="form" noValidate autoComplete="off">
                {!props.questionFormat ?
                    <>
                        <div className={s.questionFormat}>Choose a question format</div>
                        <TextField id="standard-question-format" select defaultValue="Text" className={s.questionFormatInput}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}
                                          onClick={()=> {props.changeQuestionFormat(option.value)} }>
                                    {option.label}
                                </MenuItem>
                            ))
                            }
                        </TextField>
                    </> : null
                }
            </Box>
        </div>
    );
};
