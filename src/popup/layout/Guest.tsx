import React from "react";
import Grid from "@mui/material/Grid2";
import Login from "../screens/Login";

export default function Guest({ setIsLoggedIn }) {
  return (
    <Grid
      container
      sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Grid size={12}>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </Grid>
    </Grid>
  );
}
