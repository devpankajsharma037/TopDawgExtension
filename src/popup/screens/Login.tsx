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
import CustomSnackbar from "../../component/CustomSnackbar";

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    setSnackbarOpen(true);
    setLoginSuccess(false);
    const response = await loginService(data.username, data.password);
    setLoginSuccess(response.success);
    if (response.success) {
      setIsLoggedIn(response.accessToken);
      setSnackbarMessage("Login Success");
    } else {
      setSnackbarMessage(response.message);
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
      {snackbarMessage && (
        <CustomSnackbar
          message={snackbarMessage}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
          severity={loginSuccess ? "success" : "error"}
        />
      )}
    </Box>
  );
};

export default Login;
