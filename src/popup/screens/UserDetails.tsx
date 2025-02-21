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
import {
  getUserInfo,
  updateInfoService,
  userInfoService,
} from "../../utils/service";
import { UserInfo } from "../../utils/types";
import { useSnackbar } from "../../component/CustomSnackbar";

const UserDetails = () => {
  const { popupFormLable, popupFormLayout, submitUserDetailButton } = style;
  type UserDetailsFormData = z.infer<typeof userDetailsSchema>;
  const [slug, setSlug] = useState<string | null>(null);
  const [creator, setCreator] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();

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
    formState: { errors },
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
    setLoading(true);

    const payload = userInfo?.id
      ? { id: userInfo.id, ...data }
      : { ...data, slug_id: slug, creater_id: creator };

    chrome.runtime.sendMessage(
      {
        type: userInfo?.id ? "UPDATE_USER_INFO" : "USER_INFO",
        userInfo: payload,
      },
      (response) => {
        setLoading(false);

        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
          showError("Failed to send request.");
          return;
        }

        if (response?.success) {
          showSuccess(userInfo?.id ? "User info updated!" : "User info added!");
        } else {
          showError(response?.message || "Something went wrong.");
        }

        console.log("Response from background script:", response);
      }
    );
  };

  useEffect(() => {
    if (!slug || !creator) return;

    const fetchUserInformation = async () => {
      try {
        const response = await getUserInfo(slug, creator);
        if (response.success && response.data) {
          const userData = response?.data?.data;
          const formattedData = {
            ...userData,
            age: userData.age ? String(userData.age) : "",
          };
          setUserInfo(formattedData);
          reset(formattedData);
        } else {
          console.error("Failed to fetch user info:", response.message);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInformation();
  }, [slug, creator]);

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
      {userInfo?.id ? (
        <ContainedButton
          customStyle={submitUserDetailButton}
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </ContainedButton>
      ) : (
        <ContainedButton
          customStyle={submitUserDetailButton}
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </ContainedButton>
      )}
      {SnackbarComponent}
    </Box>
  );
};

export default UserDetails;
