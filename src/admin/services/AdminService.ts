import { LoginData } from "../../login/model/LoginData";
import axios from "axios";
import { NewProductItem } from "../product/model/NewProductItem";

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

export const getAllCategories = (pageNumber: number) => {
  return axios
    .get(STORE_BACK_API + "/categories?", {
      params: { pageNumber: pageNumber.toString() },
      withCredentials: true,
    })
    .then((res) => res.data);
};

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

export const getAllProducts = (pageNumber: number) => {
  return axios
    .get(STORE_BACK_API + "/products", {
      params: { pageNumber: pageNumber.toString() },
      withCredentials: true,
    })
    .then((res) => res.data);
};

export async function createNewProducts(data: NewProductItem) {
  return axios.post(STORE_BACK_API + "/products", data, {
    withCredentials: true,
  });
}

export async function updateProduct(id: number, data: NewProductItem) {
  return axios.put(STORE_BACK_API + "/categories/" + id.toString(), data, {
    withCredentials: true,
  });
}

export async function deleteProduct(id: number) {
  return axios.delete(STORE_BACK_API + "/products/" + id.toString(), {
    withCredentials: true,
  });
}
