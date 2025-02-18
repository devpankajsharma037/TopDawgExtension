import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import style from "../../utils/style";
import { ContainedButton } from "../../component/Button";
import FormInput from "../../component/FormInput";
import { userDetailsSchema } from "../../utils/validation";
import { userInfoService } from "../../utils/service";
import { UserInfo } from "../../utils/types";

const UserDetails = () => {
  const { popupFormLable, popupFormLayout, submitUserDetailButton } = style;
  type UserDetailsFormData = z.infer<typeof userDetailsSchema>;
  const [slug, setSlug] = useState<string | null>(null);
  const [creator, setCreator] = useState<string | null>(null);
  const defaultState = {
    name: "",
    age: "",
    location: "",
    job: "",
    custom: "",
    notes: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserDetailsFormData>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: defaultState,
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        try {
          const url = new URL(tabs[0].url);
          const pathSegments = url.pathname.split("/").filter(Boolean);
          const extractedSlug = pathSegments.pop() || null;

          const searchParams = new URLSearchParams(url.search);
          const extractedCreator = searchParams.get("creator");

          setSlug(extractedSlug);
          setCreator(extractedCreator);
        } catch (error) {
          console.error("Error extracting slug and creator:", error);
        }
      }
    });
  }, []);

  const onSubmit: SubmitHandler<UserDetailsFormData> = async (data) => {
    const obj = { ...data, slug_id: slug, creater_id: creator };
    const response = await userInfoService(obj as UserInfo);

    if (response.success) {
      reset(defaultState);
    }
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
      <ContainedButton
        customStyle={submitUserDetailButton}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </ContainedButton>
    </Box>
  );
};

export default UserDetails;
