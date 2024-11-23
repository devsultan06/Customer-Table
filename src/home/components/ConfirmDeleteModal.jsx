import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ConfirmDeleteModal = ({ open, onClose, onConfirm, customerName }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Are you sure you want to delete "{customerName}"?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Yes, Delete
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
