import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import s from "./header.module.css";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectUserAvatar, selectUserName } from "../profile/profileSelectors";
import { logoutUser } from "../loginRegistration/authReducer";
import { useAppDispatch } from "app/store";
import { PATH } from "common/constans";
import profileUserLogo from "./img/profileUserLogo.png";
import arrowIcon from "../profile/img/logOutArrow.png";

export const HeaderDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const userAvatar = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);

  const menuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logOutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, []);

  const goToProfileHandler = () => {
    setAnchorEl(null);
    navigate(PATH.PROFILE);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="false"
        aria-hidden="false"
        aria-expanded={open ? "true" : undefined}
        onClick={menuHandler}
        disableRipple
        className={s.menuButton}
      >
        <Stack className={s.userProfile} direction="row" spacing={1}>
          <h4 className={s.userName}>{userName}</h4>
          <Avatar className={s.userAvatar} style={{ marginTop: "12px" }} alt="userName" src={userAvatar} />
        </Stack>
      </Button>
      <Menu
        aria-hidden="false"
        className={s.menu}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        transitionDuration={0}
        onClose={closeHandler}
      >
        <MenuItem onClick={goToProfileHandler}>
          {" "}
          <img className={s.menuProfileLogo} src={profileUserLogo} alt="profileUserLogo" />
          Profile
        </MenuItem>
        <MenuItem onClick={logOutHandler}>
          {" "}
          <img className={s.menuLogoutLogo} src={arrowIcon} alt="logoutIcon" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
