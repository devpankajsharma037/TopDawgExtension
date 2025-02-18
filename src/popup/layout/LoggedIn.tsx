import React from "react";
import UserDetails from "../screens/UserDetails";
import Grid from "@mui/material/Grid2";
import { ContainedButton } from "../../component/Button";
import { logoutService } from "../../utils/service";
import style from "../../utils/style";

export default function LoggedIn({ setIsLoggedIn }) {
  const { logoutButton } = style;

  const handleLogout = async () => {
    await logoutService();
    setIsLoggedIn("");
  };

  return (
    <Grid container>
      <ContainedButton customStyle={logoutButton} onClick={handleLogout}>
        Logout
      </ContainedButton>
      <Grid size={12}>
        <UserDetails />
      </Grid>
    </Grid>
  );
}
