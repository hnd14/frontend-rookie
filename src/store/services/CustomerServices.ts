import axios from "axios";
import { SignUpData } from "../sign-up/model/SignUpData";
import { STORE_API } from "../../const/Util.ts";

export async function signUp(data: SignUpData) {
  return axios.post(STORE_API + "/sign-up", data);
}

export async function storeFetcher(url: string, params: object = {}) {
  return axios.get(STORE_API + url, { params: params }).then((res) => res.data);
}
