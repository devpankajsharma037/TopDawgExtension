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
import { useSnackbar } from "../../component/CustomSnackbar";
import { lightGreen } from "@mui/material/colors";

const UserDetails = () => {
  const { popupFormLable, popupFormLayout, submitUserDetailButton } = style;
  type UserDetailsFormData = z.infer<typeof userDetailsSchema>;
  const [slug, setSlug] = useState<string | null>(null);
  const [creator, setCreator] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();
  const [rows, setRows] = useState(4);
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
    function getQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return {
        paramsSlug: params.get("slug"),
        paramsCreator: params.get("creator"),
        paramsTime: params.get("time"),
      };
    }

    const { paramsSlug, paramsCreator,paramsTime} = getQueryParams();
    setSlug(paramsSlug);
    setCreator(paramsCreator);
    console.log(paramsTime,'paramsTime');
    
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
          showError("Failed to send request.");
          return;
        }

        if (response?.success) {
          showSuccess(userInfo?.id ? "User info updated!" : "User info added!");
        } else {
          showError(response?.message || "Something went wrong.");
        }
      }
    );
  };

  useEffect(() => {
    if (!slug || !creator) return;

    const fetchUserInformation = () => {
      chrome.runtime.sendMessage(
        { action: "getUserInfo", slugId: slug, creatorId: creator },
        (response) => {
          if (response?.success && response?.data) {
            const userData = response.data.data;
            const formattedData = {
              ...userData,
              age: userData.age ? String(userData.age) : "",
            };
            setUserInfo(formattedData);
            reset(formattedData);
          } else {
            console.error("Failed to fetch user info:", response?.message);
          }
        }
      );
    };

    fetchUserInformation();
  }, [slug, creator, loading]);

  const calculateRows = () => {
    const screenHeight = window.innerHeight;
    const baseHeight = 600;
    const baseRows = 6;
    const rows = Math.ceil(screenHeight / (baseHeight / baseRows));
    return Math.max(5, rows);
  };

  useEffect(() => {
    const handleResize = () => setRows(calculateRows());

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action === 'updateParams'){
      let {newSlug,newCreator} =  message
      if (slug !== null && creator !== null ){
        if (newSlug !== slug || newCreator !== creator){
          setCreator(newCreator)
          setSlug(newSlug)
        }
      }
    }
  });

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
          rows: rows,
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
