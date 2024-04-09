import axios from "axios";
import { LS, USER } from "../utils/functions";
import { appConstants } from "../utils/variables";

axios.defaults.baseURL = window.__ENV__?.REACT_APP_API_URL_DEV;
const Token = LS.read(appConstants.SH_CT_ACCESS_TOKEN) || {};
const instance = LS.read(appConstants.SH_CT_INSTANCE);
let isRefreshing = false;

axios.interceptors.request.use(function (config) {
  const token = LS.read(appConstants.SH_CT_ACCESS_TOKEN);
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

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

export async function getQuickAccess() {
  const data = await axios.get(
    `/api/${instance.id}/CitizenReport/QuickAccesses`
  );
  return data.data.data;
}
