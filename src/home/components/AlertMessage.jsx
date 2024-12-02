import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({ alert, setAlert }) => {
  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => {
        clearTimeout(timer); // Clean up timer on component unmount
      };
    }
  }, [alert.open]);

  return (
    <Snackbar
      open={alert.open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert severity={alert.severity} sx={{ width: "100%" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
