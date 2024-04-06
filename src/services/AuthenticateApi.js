import axios from "axios";
import { LS, USER } from "../utils/functions";
import { appConstants } from "../utils/variables";
axios.defaults.baseURL = "https://shahrbinapi.shetabdahi.ir";
const Token = LS.read(appConstants.SH_CT_ACCESS_TOKEN) || {};
const instance = LS.read(appConstants.SH_CT_INSTANCE) || { id: 1 };
let isRefreshing = false;

// axios.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   async function (error) {
//     console.log(error);
//     const originalRequest = error.config;

//     if (error.response.status === 401) {
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         const accessToken = localStorage.getItem(
//           appConstants.SH_CT_ACCESS_TOKEN
//         );
//         const refreshToken = localStorage.getItem(
//           appConstants.SH_CT_REFRESH_TOKEN
//         );
//         //accessToken && refreshToken && !isRefreshing
//         if (!isRefreshing) {
//           isRefreshing = true;

//           try {
//             // Perform token refresh
//             const data = await RefreshToken({
//               token: accessToken,
//               refreshToken: refreshToken,
//             });

//             // Retry the original request
//             return axios(originalRequest);
//           } catch (refreshError) {
//             console.error("Token refresh failed", refreshError);
//             // Handle refresh error, e.g., redirect to login page
//             return Promise.reject(refreshError);
//           } finally {
//             isRefreshing = false;
//           }
//         }
//       }
//     }

//     // For other errors or if refresh token logic is not applicable
//     return Promise.reject(error);
//   }
// );

export async function GetCaptcha() {
  const data = await axios.get(`/api/${instance.id}/Authenticate/Captcha`, {
    responseType: "blob",
  });
  return data;
}

export async function RefreshToken(payload) {
  try {
    const response = await axios.post(
      `/api/${instance.id}/Authenticate/Refresh`,
      payload
    );
    LS.save(appConstants.SH_CT_ACCESS_TOKEN, response.data.data.jwtToken);
    LS.save(appConstants.SH_CT_REFRESH_TOKEN, response.data.data.refreshToken);
    // localStorage.setItem(
    //   appConstants.SH_CT_ACCESS_TOKEN,
    //   response.data.jwtToken
    // );
    // localStorage.getItem(
    //   appConstants.SH_CT_REFRESH_TOKEN,
    //   response.data.refreshToken
    // );
    window.location.reload();
    return response.data;
  } catch (error) {
    USER.clear();
    // window.location.href = "/";
  }
}

export async function resendOtp(payload) {
  const data = await axios.post(`/api/1/Authenticate/ResendOtp`, payload);
  return data.data;
}
