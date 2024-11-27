// ActionMenu.js
import React, { useContext } from "react";
import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { AuthContext } from "../../context/AuthContext";

const ActionMenu = ({
  anchorEl,
  open,
  handleMenuOpen,
  handleMenuClose,
  handleOpenDeleteModal,
  handleOpenEditModal,
  handleOpenViewModal,
}) => {
  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon sx={{ fontSize: "20px", color: "black" }} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem sx={{ color: "#4B85FA" }} onClick={handleOpenViewModal}>
          <Button sx={{ display: "flex", alignItems: "center" }}>
            View
            <ErrorOutlineIcon sx={{ marginLeft: "10px" }} />
          </Button>
        </MenuItem>

        <MenuItem sx={{ color: "#4B85FA" }} onClick={handleOpenEditModal}>
          <Button sx={{ display: "flex", alignItems: "center" }}>
            Edit
            <EditIcon sx={{ marginLeft: "10px" }} />
          </Button>
        </MenuItem>

        <MenuItem onClick={handleOpenDeleteModal} sx={{ color: "#DC4067" }}>
          <Button color="error" sx={{ display: "flex", alignItems: "center" }}>
            Delete
            <DeleteIcon sx={{ marginLeft: "10px" }} />
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionMenu;
