import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import DeleteIcon from "@mui/icons-material/Delete";

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  customerName,
  loading,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "70%", md: "50%" }, 
          maxWidth: "500px", 
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: 24,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#d32f2f", 
          }}
        >
          Confirm Deletion
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ marginBottom: "30px", color: "#555" }}
        >
          Are you sure you want to delete{" "}
          <span style={{ fontWeight: "bold", color: "#000" }}>
            "{customerName}"
          </span>
          ? This action cannot be undone.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            disabled={loading}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                colors={["#d32f2f", "#d32f2f", "#d32f2f", "#d32f2f", "#d32f2f"]}
              />
            ) : (
              <>
                Delete
                <DeleteIcon sx={{ marginLeft: "10px" }} />
              </>
            )}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
              borderColor: "#1976d2", 
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
