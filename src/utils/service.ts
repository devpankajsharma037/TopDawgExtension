import axios from "axios";
import { setStorage, getStorage, removeStorage } from "./storage";

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "http://127.0.0.1:8000";

export const loginService = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signin/`, {
      username,
      password,
    });

    const { token, status, message } = response.data;

    if (!status) throw new Error(message || "Login failed.");

    await setStorage("accessToken", token.access);
    await setStorage("refreshToken", token.refresh);
    await setStorage("user", response.data.user);

    return {
      success: true,
      accessToken: token.access,
      refreshToken: token.refresh,
      user: response.data.user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed.",
    };
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  return await getStorage("accessToken");
};

export const logoutService = async () => {
  await removeStorage(["accessToken", "refreshToken", "user"]);
};
