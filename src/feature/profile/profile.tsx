import {Box, FormGroup, IconButton, Paper, Stack} from "@mui/material";
import BadgeAvatars from "./StyledBadge";
import Button from "@mui/material/Button";
import arrowIcon from './img/logOutArrow.png';
import React, {ChangeEvent, useCallback, useState} from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditableSpan from "./EditableSpan";
import {RootReducerType, useAppDispatch, useAppSelector} from "../../app/store";
import {logoutUser, UserDataType} from "../../common/loginRegistration/authReducer";
import {updateUser} from "./profileReducer";
import {Navigate} from "react-router-dom";


export const Profile = () => {
    const dispatch = useAppDispatch()
    const isSignUp = useAppSelector<boolean>((state) => state.auth.isAuth);
    const logOutHandler = useCallback(() => {
        dispatch(logoutUser())
    }, [])
    const userData = useAppSelector<UserDataType | undefined>((state) => state.auth.userData)
    let [name, setName] = useState<any>(userData?.name);


    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value)
    }

    if(!isSignUp) {
      return <Navigate to={'/friday-cards/registration'}/>
    }

    return <div>
        <Stack ml={12} direction="row" spacing={1}>
            <KeyboardBackspaceIcon fontSize={"small"}/>
            <span>
                <a href=""> Back to Packs List</a>
            </span>
        </Stack>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 6,
                    width: 413,
                    height: 408,
                },
            }}
        >
            <Paper>
                <Stack direction="column"
                       justifyContent="space-between"
                       alignItems="center"
                       marginTop={'27px'}
                       spacing={2}>
                    <h2>Personal information</h2>
                    <BadgeAvatars/>
                    <EditableSpan
                        value={name}
                        onChange={changeName}
                        spanProps={{
                           defaultText:userData?.name,
                            onChange:changeName
                        }}
                    />
                    <span>{userData?.email}</span>
                    <Button
                        type={"submit"}
                        variant={"contained"}
                        onClick={logOutHandler}
                        sx={{
                            color: 'black',
                            backgroundColor: 'white',
                            borderRadius: "30px",
                            textTransform: "none",
                            width: 127,
                            height: 36,
                            "&:hover": {
                                backgroundColor: "transparent"
                            }
                        }}
                        startIcon={<img src={arrowIcon} style={{width: 30, height: 30}} alt=""/>}
                    >
                        Log out
                    </Button>
                </Stack>
            </Paper>
        </Box>
    </div>;
};
