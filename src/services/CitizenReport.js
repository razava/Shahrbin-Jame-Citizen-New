import axios from "axios";
import { LS, USER } from "../utils/functions";
import { appConstants } from "../utils/variables";
axios.defaults.baseURL = process.env.REACT_APP_API_URL_DEV;
const Token = LS.read(appConstants.SH_CT_ACCESS_TOKEN) || {};
const instance = LS.read(appConstants.SH_CT_INSTANCE);
let isRefreshing = false;

export async function postFeedback({ id, payload }) {
  const data = await axios.post(
    `/api/${instance.id}/CitizenReport/Feedback/${id}`,
    payload,
    {
      headers: { Authorization: `Bearer ${Token}` },
    }
  );
  return data.data;
}

export async function postObjection({ id, payload }) {
  const data = await axios.post(
    `/api/${instance.id}/CitizenReport/Objection/${id}`,
    payload,
    {
      headers: { Authorization: `Bearer ${Token}` },
    }
  );
  return data.data;
}
