import { LoginData } from "../login/model/LoginData";
import axios from "axios";

export async function login(data: LoginData) {
  const response = await axios.post(
    "http://localhost:8080/auth/sign-in",
    data,
    {
      headers: { "Content-Type": "application/json" },
      proxy: {
        protocol: "http",
        host: "localhost",
        port: 8080,
      },
    }
  );

  return response;
}
