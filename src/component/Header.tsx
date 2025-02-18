import React from "react";
import Logo from "./Logo";
import style from "../utils/style";
import Grid from "@mui/material/Grid2";
import { ContainedButton } from "./Button";
import { logoutService } from "../utils/service";

export default function Header() {
  const { popupLogoGrid } = style;

  return (
    <Grid container sx={popupLogoGrid} component={"header"}>
      <Logo />
    </Grid>
  );
}
