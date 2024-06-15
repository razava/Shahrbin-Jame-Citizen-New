import axios from "axios";
import { LS } from "../utils/functions";
import { appConstants } from "../utils/variables";

const complaintApi = axios.create({
  baseURL: "https://complaintapi.shetabdahi.ir/",
});
axios.defaults.baseURL = window.__ENV__?.REACT_APP_API_URL_DEV;
const Token = LS.read(appConstants.SH_CT_ACCESS_TOKEN) || {};
const instance = LS.read(appConstants.SH_CT_INSTANCE);

export async function getFAQ() {
  const data = await axios.get(`/api/CitizenFAQ`, {
    headers: { Authorization: `Bearer ${Token}` },
    params: { instanceId: instance?.id },
  });
  return data.data.data;
}

export async function getComplaintHistory(id) {
  const data = await complaintApi.get(
    `/api/CitizenComplaint/ComplaintHistory/${id}`,
    {
      headers: { Authorization: `Bearer ${Token}` },
      params: { instanceId: instance?.id },
    }
  );
  return data.data.data;
}
