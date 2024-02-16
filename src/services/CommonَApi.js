import axios from "axios";
import { LS } from "../utils/functions";
import { appConstants } from "../utils/variables";
axios.defaults.baseURL = process.env.REACT_APP_API_URL_DEV;
const Token = LS.read(appConstants.SH_CT_ACCESS_TOKEN) || {};
const instance = LS.read(appConstants.SH_CT_INSTANCE);

export async function getFAQ() {
  const data = await axios.get(`/api/${instance.id}/CitizenFAQ`, {
    headers: { Authorization: `Bearer ${Token}` },
  });
  return data.data;
}

export async function postFiles(payload) {
  const data = await axios.post(`/api/Files`, payload, {
    headers: { Authorization: `Bearer ${Token}` },
  });
  return data.data;
}
