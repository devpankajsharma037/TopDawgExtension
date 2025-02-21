import axios from "axios";
import { setStorage, getStorage, removeStorage } from "./storage";
import {
  TOP_DAW_ACCESS_TOKEN,
  TOP_DAW_ACCESS_USER,
  TOP_DAW_REFRESH_TOKEN,
} from "./constant";
import { UserInfo } from "./types";

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "http://44.207.27.9:8000/api/v1";

export const loginService = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin/`, {
      username,
      password,
    });

    const { token, status, message } = response.data;

    if (!status) throw new Error(message || "Login failed.");

    await setStorage(TOP_DAW_ACCESS_TOKEN, token.access);
    await setStorage(TOP_DAW_REFRESH_TOKEN, token.refresh);
    await setStorage(TOP_DAW_ACCESS_USER, response.data.user);

    return {
      success: true,
      accessToken: token.access,
      refreshToken: token.refresh,
      user: response.data.user,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.data?.non_field_errors?.[0] || "Login failed.",
    };
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  return await getStorage(TOP_DAW_ACCESS_TOKEN);
};

export const logoutService = async () => {
  await removeStorage([
    TOP_DAW_ACCESS_TOKEN,
    TOP_DAW_REFRESH_TOKEN,
    TOP_DAW_ACCESS_USER,
  ]);
};

export const userInfoService = async (userInfo: UserInfo) => {
  try {
    const token = await getAuthToken();

    const headers = token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };

    const { data } = await axios.post(`${API_URL}/info/create/`, userInfo, {
      headers,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Request failed.",
    };
  }
};

export const getUserInfo = async (slugId, creatorId) => {
  try {
    const token = await getAuthToken();

    const headers = token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };

    const { data } = await axios.get(
      `${API_URL}/info/get/${slugId}/${creatorId}`,
      {
        headers,
      }
    );
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(" API Error:", error.response?.data || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Error while fetching user information.",
    };
  }
};

export const updateInfoService = async (userInfo: UserInfo) => {
  try {
    const token = await getAuthToken();

    const headers = token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };

    const { data } = await axios.patch(`${API_URL}/info/update/`, userInfo, {
      headers,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error(" API Error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Request failed.",
    };
  }
};
