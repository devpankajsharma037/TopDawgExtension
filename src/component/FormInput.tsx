import React from "react";
import TextField from "@mui/material/TextField";
import style from "../utils/style";
import { UseFormRegisterReturn } from "react-hook-form";
import { Typography } from "@mui/material";

interface FormInputProps {
  value?: string;
  placeholder?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  registerProps?: UseFormRegisterReturn;
  type?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      value,
      helperText = "",
      type = "text",
      placeholder,
      multiline,
      rows,
      registerProps,
      ...props
    },
    ref
  ) => {
    const { popupFormInput } = style;

    return (
      <>
        <TextField
          value={value}
          inputRef={ref}
          placeholder={placeholder}
          fullWidth
          variant="outlined"
          type={type}
          sx={popupFormInput}
          size="small"
          multiline={multiline}
          rows={multiline ? rows : undefined}
          {...registerProps}
          {...props}
        />
        {helperText && (
          <Typography variant="caption" color={"error"}>
            {helperText}
          </Typography>
        )}
      </>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
