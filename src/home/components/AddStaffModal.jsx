import React, { useMemo} from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ColorRing } from "react-loader-spinner";

function AddStaffModal({
  open,
  handleClose,
  handleSaveCustomer,
  loading,
  handleCloseModal,
  handleInputChange,
  newCustomer,
}) {
  const isFormValid = useMemo(() => {
    // Check if all fields are filled
    const allFieldsFilled = Object.values(newCustomer).every(
      (value) => value.toString().trim() !== ""
    );

    // Check if numerical fields (rate, balance, deposit) are non-negative
    const noNegativeValues =
      newCustomer.rate >= 0 &&
      newCustomer.balance >= 0 &&
      newCustomer.deposit >= 0;

    return allFieldsFilled && noNegativeValues;
  }, [newCustomer]);
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
          Add New Customer
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={newCustomer.name}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={newCustomer.description}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={newCustomer.status}
            onChange={handleInputChange}
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Due">Due</MenuItem> 
            <MenuItem value="Paid">Paid</MenuItem> 
          </Select>
        </FormControl>

        <TextField
          label="Rate"
          name="rate"
          type="number"
          value={newCustomer.rate}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          error={newCustomer.rate < 0}
          helperText={newCustomer.rate < 0 ? "Rate cannot be negative" : ""}
        />
        <TextField
          label="Balance"
          name="balance"
          type="number"
          value={newCustomer.balance}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          error={newCustomer.balance < 0}
          helperText={
            newCustomer.balance < 0 ? "Balance cannot be negative" : ""
          }
        />
        <TextField
          label="Deposit"
          name="deposit"
          type="number"
          value={newCustomer.deposit}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          error={newCustomer.deposit < 0}
          helperText={
            newCustomer.deposit < 0 ? "Deposit cannot be negative" : ""
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveCustomer}
          disabled={!isFormValid}
          sx={{ mr: 2 }}
        >
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
            "Save"
          )}{" "}
        </Button>
        <Button variant="outlined" onClick={handleCloseModal}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default AddStaffModal;
