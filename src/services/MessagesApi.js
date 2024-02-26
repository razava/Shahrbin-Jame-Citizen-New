import axios from "axios";
import { LS } from "../utils/functions";
import { appConstants } from "../utils/variables";
axios.defaults.baseURL = process.env.REACT_APP_API_URL_DEV;
const Token = LS.read(appConstants.SH_CT_ACCESS_TOKEN) || {};
const instance = LS.read(appConstants.SH_CT_INSTANCE);

export async function postConnectionId(id) {
  const data = await axios.post(
    `/api/${instance.id}/Messages/ConnectionId`,
    id,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }
  );
  return data.data;
}
