// ActionMenu.js
import React, { useContext } from "react";
import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ColorRing } from "react-loader-spinner"; // Assuming this is the correct import for your loading spinner
import { AuthContext } from "../../context/AuthContext";

const ActionMenu = ({
  anchorEl,
  open,
  handleMenuOpen,
  handleMenuClose,
  handleDelete,
  loading,
  handleEdit
}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon sx={{ fontSize: "20px", color: "black" }} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem sx={{ color: "#4B85FA" }}>
          <Button sx={{ display: "flex", alignItems: "center" }}>
            View
            <ErrorOutlineIcon sx={{ marginLeft: "10px" }} />
          </Button>
        </MenuItem>

        <MenuItem sx={{ color: "#4B85FA" }} onClick={handleEdit}>
          <Button sx={{ display: "flex", alignItems: "center" }}>
            Edit
            <EditIcon sx={{ marginLeft: "10px" }} />
          </Button>
        </MenuItem>

        {currentUser.email === "sultanabaniks@gmail.com" && (
          <MenuItem onClick={handleDelete} sx={{ color: "#DC4067" }}>
            {loading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                colors={["#316bf3", "#316bf3", "#316bf3", "#316bf3", "#316bf3"]}
              />
            ) : (
              <Button
                color="error"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Delete
                <DeleteIcon sx={{ marginLeft: "10px" }} />
              </Button>
            )}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ActionMenu;
