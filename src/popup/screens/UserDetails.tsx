import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import style from "../../utils/style";
import { ContainedButton } from "../../component/Button";
import FormInput from "../../component/FormInput";
import { userDetailsSchema } from "../../utils/validation";

const UserDetails = () => {
  const { popupFormLable, popupFormLayout, submitUserDetailButton } = style;
  type UserDetailsFormData = z.infer<typeof userDetailsSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetailsFormData>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: "",
      age: "",
      location: "",
      job: "",
      custom: "",
      notes: "",
    },
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        console.log(tabs[0].url || "No URL found");
      }
    });
  }, []);

  const onSubmit: SubmitHandler<UserDetailsFormData> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <Box
      sx={popupFormLayout}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {[
        { name: "name", label: "Name", placeholder: "Name" },
        { name: "age", label: "Age", placeholder: "Age" },
        { name: "location", label: "Location", placeholder: "Location" },
        { name: "job", label: "Job", placeholder: "Job" },
        { name: "custom", label: "Custom", placeholder: "Custom requests" },
        {
          name: "notes",
          label: "Notes",
          placeholder: "Write your notes here",
          multiline: true,
          rows: 4,
        },
      ].map(({ name, label, placeholder, multiline, rows }) => (
        <Grid container key={name} spacing={2} alignItems="flex-start">
          <Grid size={3}>
            <Typography sx={popupFormLable} variant="caption">
              {label}:
            </Typography>
          </Grid>
          <Grid size={9}>
            <FormInput
              {...register(name as any)}
              placeholder={placeholder}
              helperText={errors[name]?.message}
              multiline={multiline}
              rows={multiline ? rows : undefined}
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

export default UserDetails;
