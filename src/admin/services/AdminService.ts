import { LoginData } from "../login/model/LoginData";
import axios from "axios";

const STORE_BACK_API = "http://localhost:8080/store-back";

export async function login(data: LoginData) {
  const response = await axios.post(
    "http://localhost:8080/auth/sign-in",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    }
  );

  return response;
}

export async function getAllCategories() {
  return axios.get(STORE_BACK_API + "/categories", {
    withCredentials: true,
  });
}

export async function createNewCategory(data: { name: string; desc: string }) {
  return axios.post(STORE_BACK_API + "/categories", data, {
    withCredentials: true,
  });
}

export async function updateCategory(id: number, desc: string) {
  const data = {
    desc: desc,
  };
  return axios.put(STORE_BACK_API + "/categories/" + id.toString(), data, {
    withCredentials: true,
  });
}

export async function deleteCategory(id: number) {
  return axios.delete(STORE_BACK_API + "/categories/" + id.toString(), {
    withCredentials: true,
  });
}
