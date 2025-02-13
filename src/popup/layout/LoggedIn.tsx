import React from "react";
import UserDetails from "../screens/UserDetails";
import Grid from "@mui/material/Grid2";

export default function LoggedIn() {
  return (
    <Grid container>
      <Grid size={12}>
        <UserDetails />
      </Grid>
    </Grid>
  );
}
