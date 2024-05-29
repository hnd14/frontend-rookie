import axios from "axios";
import { SignUpData } from "../sign-up/model/SignUpData";
const STORE_API = "http://localhost:8080/store";

export async function signUp(data: SignUpData) {
  return axios.post(STORE_API + "/sign-up", data);
}
