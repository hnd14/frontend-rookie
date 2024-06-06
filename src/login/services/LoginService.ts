import { LoginData } from "../../login/model/LoginData";
import axios from "axios";
import { AUTH_API } from "../../const/Util.ts";

export async function login(data: LoginData) {
  const response = await axios.post(AUTH_API + "/sign-in", data, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });

  return response;
}

export async function logout() {
  return axios.get(AUTH_API + "/log-out", {
    withCredentials: true,
  });
}

export async function verify() {
  return axios
    .get(AUTH_API + "/verify", { withCredentials: true })
    .then((res) => res.data);
}

export const authFetcher = (url) => {
  return axios
    .get(AUTH_API + url, { withCredentials: true })
    .then((res) => res.data);
};

export const updatePassword = (data) => {
  return axios.put(AUTH_API + "/me/password", data, { withCredentials: true });
};
