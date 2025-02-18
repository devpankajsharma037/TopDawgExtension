import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
  severity?: any;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({
  message,
  open,
  onClose,
  duration = 3000,
  severity = "success",
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, duration]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
