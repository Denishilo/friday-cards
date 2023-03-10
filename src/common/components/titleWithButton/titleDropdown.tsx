import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import { EditPackModal } from "components/modal/editPackModal";
import { DeletePackModal } from "components/modal/deletePackModal";

export const TitleDropdown = ({ pack_id, pack_name }: PropsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [activeEditPack, setActiveEditPack] = useState(false);
  const [activeDeletePack, setActiveDeletePack] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const editPackModalHandler = () => {
    setActiveEditPack(true);
  };

  const deletePackModalHandler = () => {
    setActiveDeletePack(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="false"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
      >
        <ArrowDropDownCircleOutlinedIcon sx={{ color: "black", cursor: "pointer" }} />
      </Button>
      <Menu
        id="basic-menu"
        sx={{ marginLeft: 3 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transitionDuration={0}
      >
        <MenuItem onClick={editPackModalHandler}>
          {" "}
          <BorderColorOutlinedIcon /> Edit
        </MenuItem>
        <MenuItem onClick={deletePackModalHandler}>
          {" "}
          <DeleteOutlineOutlinedIcon /> Delete{" "}
        </MenuItem>
        <EditPackModal active={activeEditPack} setActive={setActiveEditPack} pack_id={pack_id} pack_name={pack_name} />
        <DeletePackModal
          active={activeDeletePack}
          setActive={setActiveDeletePack}
          pack_id={pack_id}
          pack_name={pack_name}
        />
      </Menu>
    </div>
  );
};

///////////////types//////////////
type PropsType = {
  pack_id: any;
  pack_name: any;
};
