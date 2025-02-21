import React, { useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarState {
  message: string;
  open: boolean;
  severity: "success" | "error" | "info" | "warning";
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: "",
    open: false,
    severity: "success",
  });

  const showSuccess = useCallback((message: string) => {
    setSnackbar({ message, open: true, severity: "success" });
  }, []);

  const showError = useCallback((message: string) => {
    setSnackbar({ message, open: true, severity: "error" });
  }, []);

  const handleClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const SnackbarComponent = (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );

  return { showSuccess, showError, SnackbarComponent };
}
