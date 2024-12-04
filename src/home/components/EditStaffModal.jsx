import React, { useState, useEffect, useMemo } from "react";
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

function EditStaffModal({
  open,
  handleClose,
  loading,
  handleCloseModal,
  handleEdit,
  selectedCustomer,
}) {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    status: "",
    rate: 0,
    balance: 0,
    deposit: 0,
  });

  // Sync form values with the selectedCustomer when modal opens
  useEffect(() => {
    if (selectedCustomer && open) {
      setFormValues({
        name: selectedCustomer.name || "",
        description: selectedCustomer.description || "",
        status: selectedCustomer.status || "",
        rate: selectedCustomer.rate || 0,
        balance: selectedCustomer.balance || 0,
        deposit: selectedCustomer.deposit || 0,
      });
    }
  }, [selectedCustomer, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        value === "" // Check if the input is empty
          ? ""
          : name === "rate" || name === "balance" || name === "deposit"
          ? +value // Convert to number for numeric fields
          : value, // Keep the value as a string for other fields
    }));
  };

  // Validate form
  const isFormValid = useMemo(() => {
    const allFieldsFilled = Object.values(formValues).every(
      (value) => value !== "" && value !== null && value !== undefined
    );
    const noNegativeValues =
      formValues.rate >= 0 &&
      formValues.balance >= 0 &&
      formValues.deposit >= 0;
    return allFieldsFilled && noNegativeValues;
  }, [formValues]);

  const handleSubmit = () => {
    if (!selectedCustomer || !selectedCustomer.id) {
      console.error("Selected customer is invalid or does not have an ID");
      return; // Prevent further execution if selectedCustomer is invalid
    }
    handleEdit({ ...formValues, id: selectedCustomer.id });
  };

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
          Edit Customer
        </Typography>
        <TextField
          label="Name"
          name="name"
          fullWidth
          sx={{ mb: 2 }}
          value={formValues.name}
          onChange={handleChange}
          error={!formValues.name}
          helperText={!formValues.name ? "Name is required" : ""}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          sx={{ mb: 2 }}
          value={formValues.description}
          onChange={handleChange}
          error={!formValues.description}
          helperText={!formValues.description ? "Description is required" : ""}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={formValues.status}
            onChange={handleChange}
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
          fullWidth
          sx={{ mb: 2 }}
          value={formValues.rate}
          onChange={handleChange}
          error={formValues.rate < 0}
          helperText={formValues.rate < 0 ? "Rate cannot be negative" : ""}
        />
        <TextField
          label="Balance"
          name="balance"
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          value={formValues.balance}
          onChange={handleChange}
          error={formValues.balance < 0}
          helperText={
            formValues.balance < 0 ? "Balance cannot be negative" : ""
          }
        />
        <TextField
          label="Deposit"
          name="deposit"
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          value={formValues.deposit}
          onChange={handleChange}
          error={formValues.deposit < 0}
          helperText={
            formValues.deposit < 0 ? "Deposit cannot be negative" : ""
          }
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          ) : (
            "Update"
          )}
        </Button>
        <Button variant="outlined" onClick={handleCloseModal}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default EditStaffModal;
