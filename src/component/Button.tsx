import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import style from "../utils/style";

interface ButtonProp extends React.ComponentProps<typeof Button> {
  customClass?: string;
  customStyle?: any;
}

export const ContainedButton = ({
  children,
  customStyle,
  ...rest
}: ButtonProp) => {
  const { containedButton } = style;

  return (
    <Button
      variant="contained"
      sx={{ ...containedButton, ...customStyle }}
      {...rest}
      disableElevation
    >
      {children}
    </Button>
  );
};
