import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import style from "../../utils/style";
import Grid from "@mui/material/Grid2";
import Guest from "./Guest";
import LoggedIn from "./LoggedIn";
import { getAuthToken } from "../../utils/service";

export default function LayoutContent() {
  const [isloggedIn, setIsLoggedIn] = useState("");
  const { popupMainContent } = style;
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAuthToken();
      setIsLoggedIn(token);
    };

    fetchToken();
  }, [isloggedIn]);

  return (
    <Box component={"main"} sx={popupMainContent}>
      {isloggedIn ? (
        <LoggedIn setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Guest setIsLoggedIn={setIsLoggedIn} />
      )}
    </Box>
  );
}
