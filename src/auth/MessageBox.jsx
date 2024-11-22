// MessageBox.jsx
import React from "react";
import Alert from "@mui/material/Alert";

const MessageBox = ({ type, text }) => {
  if (!text) return null; // If there's no message, render nothing.

  return <Alert severity={type}>{text}</Alert>;
};

export default MessageBox;
