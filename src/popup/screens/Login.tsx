import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import style from "../../utils/style";
import { ContainedButton } from "../../component/Button";
import FormInput from "../../component/FormInput";
import { authSchema } from "../../utils/validation";
import { loginService } from "../../utils/service";
import { useSnackbar } from "../../component/CustomSnackbar";

const Login = ({ setIsLoggedIn }) => {
  const { popupFormLable, popupFormLayout, submitUserDetailButton } = style;
  type AuthSchema = z.infer<typeof authSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { showSuccess, showError, SnackbarComponent } = useSnackbar();

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    const response = await loginService(data.username, data.password);
    if (response.success) {
      setIsLoggedIn(response.accessToken);
      showSuccess("Login Success");
    } else {
      showError(response.message);
    }
  };

  return (
    <Box
      sx={popupFormLayout}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {[
        {
          name: "username",
          type: "text",
          label: "Username",
          placeholder: "Username",
        },
        {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
      ].map(({ name, type, label, placeholder }) => (
        <Grid container key={name} spacing={2} alignItems="flex-start">
          <Grid item xs={3}>
            <Typography sx={popupFormLable} variant="caption">
              {label}:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <FormInput
              type={type}
              {...register(name as any)}
              placeholder={placeholder}
              helperText={errors[name]?.message}
            />
          </Grid>
        </Grid>
      ))}

      <ContainedButton
        customStyle={submitUserDetailButton}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </ContainedButton>
      {SnackbarComponent}
    </Box>
  );
};

export default Login;
