import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const MessageBox = ({ alert, setAlert }) => {
  const handleClose = () => {
    console.log("Closing alert");
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (alert.open) {
      console.log("Alert opened:", alert.message);
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => {
        console.log("Cleaning up timer");
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

export default MessageBox;
