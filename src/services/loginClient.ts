import axios from "axios";

const VITE_LOGIN_API_URL = import.meta.env["VITE_LOGIN_API_URL"];

export const loginClient = {
  async signIn(username: string, password: string) {
    const response = await axios.post(VITE_LOGIN_API_URL, {
      username,
      password,
    });
    return response.data; // JWT token string
  },
};
