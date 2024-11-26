import React from "react";
import { Modal, Box, Typography, Divider, Button } from "@mui/material";
import { format } from "date-fns";

function ViewModal({ open, handleClose, handleCloseModal, selectedCustomer }) {
  const getFormattedDate = (timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate();
    return format(date, "MMMM d, yyyy"); // Format the date as "Month Day, Year"
  };
  const formattedDate = selectedCustomer?.lastUpdated
    ? getFormattedDate(selectedCustomer.lastUpdated)
    : null;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Customer Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Name:</strong> {selectedCustomer?.name || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Description:</strong> {selectedCustomer?.description || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Created On:</strong> {selectedCustomer?.createdOn || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Created By:</strong> {selectedCustomer?.createdBy || "N/A"}
        </Typography>
        {formattedDate && (
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Last Updated:</strong> {formattedDate}
          </Typography>
        )}
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Status:</strong> {selectedCustomer?.status || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Rate:</strong> {selectedCustomer?.rate || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Balance:</strong> {selectedCustomer?.balance || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Deposit:</strong> {selectedCustomer?.deposit || "N/A"}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCloseModal}
          sx={{ mr: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ViewModal;
