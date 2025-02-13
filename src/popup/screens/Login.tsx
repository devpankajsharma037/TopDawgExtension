import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import style from "../../utils/style";
import { ContainedButton } from "../../component/Button";
import FormInput from "../../component/FormInput";
import { authSchema } from "../../utils/validation";

const Login = ({ setIsLoggedIn }) => {
  const { popupFormLable, popupFormLayout, submitUserDetailButton } = style;
  type AuthSchema = z.infer<typeof authSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthSchema> = (data) => {
    console.log("Form submitted:", data);
    setIsLoggedIn(true);
  };

  return (
    <Box
      sx={popupFormLayout}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {[
        { name: "email", type: "email", label: "Email", placeholder: "Email" },
        {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "password",
        },
      ].map(({ name, type, label, placeholder }) => (
        <Grid container key={name} spacing={2} alignItems="flex-start">
          <Grid size={3}>
            <Typography sx={popupFormLable} variant="caption">
              {label}:
            </Typography>
          </Grid>
          <Grid size={9}>
            <FormInput
              type={type}
              {...register(name as any)}
              placeholder={placeholder}
              helperText={errors[name]?.message}
            />
          </Grid>
        </Grid>
      ))}
      <ContainedButton customStyle={submitUserDetailButton} type="submit">
        Submit
      </ContainedButton>
    </Box>
  );
};

export default Login;
