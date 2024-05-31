import axios from "axios";
import { NewProductItem } from "../product/model/NewProductItem";
import { STORE_BACK_API } from "../../const/Util.ts";

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
  return axios.put(STORE_BACK_API + "/products/" + id.toString(), data, {
    withCredentials: true,
  });
}

export async function deleteProduct(id: number) {
  return axios.delete(STORE_BACK_API + "/products/" + id.toString(), {
    withCredentials: true,
  });
}

export const getProducts = (id: string) => {
  return axios
    .get(STORE_BACK_API + "/products/" + id.toString(), {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const adminFetcher = (url, params) => {
  return axios
    .get(STORE_BACK_API + url, { params: params, withCredentials: true })
    .then((res) => res.data);
};

export const postImages = (images, productId) => {
  const data = new FormData();
  data.set("file", images);
  data.set("productId", productId);
  return axios.post(STORE_BACK_API + "/images/upload", data, {
    headers: {
      "content-type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const postThumbnail = (data) => {
  for (const [key, value] of data) {
    console.log(`${key}: ${value}\n`);
  }
  return axios.post(STORE_BACK_API + "/images/thumnails/upload", data, {
    headers: {},
    withCredentials: true,
  });
};
