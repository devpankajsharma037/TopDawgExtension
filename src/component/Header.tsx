import React from "react";
import Logo from "./Logo";
import style from "../utils/style";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { ContainedButton } from "./Button";

export default function Header() {
  const { popupLogoGrid } = style;
  return (
    <Grid container sx={popupLogoGrid} component={"header"}>
      {/* <Logo/> */}
      <Typography
        variant="h1"
        sx={{ color: "#fff", fontSize: "2rem" }}
        fontWeight={600}
      >
        TOPDAW
      </Typography>
      <ContainedButton>Logout</ContainedButton>
    </Grid>
  );
}
