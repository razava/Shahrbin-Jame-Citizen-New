import axios from "axios";
import { toast } from "react-toastify";
import { ERROR, LS, URI, USER } from "../utils/functions";
import {
  API_URL,
  appConstants,
  appRoutes,
  contentTypes,
  statusCodes,
} from "../utils/variables";
import { RefreshToken } from "./AuthenticateApi";

axios.interceptors.request.use(function (config) {
  const token = LS.read(appConstants.SH_CT_ACCESS_TOKEN);
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

let isRefreshing = false;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log("orggg");
    if (error.response.status === 403) {
      window.location.href = "/";
      USER.clear();
      // navigate(appRoutes.signin);
    }
    if (error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const accessToken = JSON.parse(
          localStorage.getItem(appConstants.SH_CT_ACCESS_TOKEN)
        );
        const refreshToken = JSON.parse(
          localStorage.getItem(appConstants.SH_CT_REFRESH_TOKEN)
        );
        //accessToken && refreshToken && !isRefreshing
        if (!isRefreshing && accessToken && refreshToken) {
          isRefreshing = true;

          try {
            // Perform token refresh
            const data = await RefreshToken({
              token: accessToken,
              refreshToken: refreshToken,
            });
            if (data) {
              console.log(data);
              originalRequest.headers["Authorization"] =
                "Bearer " +
                localStorage.getItem(appConstants.SH_CT_ACCESS_TOKEN);
            }
            // Retry the original request
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            // Handle refresh error, e.g., redirect to login page
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
      }
    }

    // For other errors or if refresh token logic is not applicable
    return Promise.reject(error);
  }
);

const createApi = () => {
  return new Proxy(
    {},
    {
      get(target, key) {
        return async function (props) {
          const {
            method = "get",
            id = null,
            params = {},
            headers = {},
            payload = null,
            tail = "",
            cancelTokenBearer = { current: null },
            showMessageOnError = true,
            isPerInstance = true,
            // instanceId = null,
            instanceId = 1,
          } = props || {}; // request props

          const cancelToken = axios.CancelToken.source(); // cancel token
          cancelTokenBearer.current = cancelToken;
          const isAuthenticated = LS.read(appConstants.SH_CT_ACCESS_TOKEN);
          const instance = LS.read(appConstants.SH_CT_INSTANCE);
          const createRequest = () => {
            const token = LS.read(appConstants.SH_CT_ACCESS_TOKEN)
              ? `Bearer ${LS.read(appConstants.SH_CT_ACCESS_TOKEN)}`
              : ""; // auth token

            const requestHeaders = {
              headers: {
                "Content-Type": contentTypes.json,
                ...headers,
              },
              cancelToken: cancelToken.token,
            };
            if (token) requestHeaders.headers.Authorization = token; // request headers

            const mainRequestUrl = `${API_URL}/api${
              isPerInstance ? "/" + (instanceId || instance?.id) : ""
            }/${key}${tail ? "/" + tail : ""}${id !== null ? "/" + id : ""}`; // request url

            const requestUrl = URI.addQueryParam(mainRequestUrl, params); // request query params

            const isType1 = method === "get" || method === "delete";

            const firstArg = requestUrl; // axios first arguments

            const secondArg = isType1 ? requestHeaders : payload; // axios second arguments

            const thirdArg = isType1 ? undefined : requestHeaders; // axios third arguments

            return { firstArg, secondArg, thirdArg };
          };

          const sendRequest = async () => {
            try {
              const { firstArg, secondArg, thirdArg } = createRequest();
              const response = await axios[method](
                firstArg,
                secondArg,
                thirdArg
              ); // request response
              return handleResponse(response);
            } catch (err) {
              const { status } = err.response || {};
              const rejectTo = {
                success: false,
                data: null,
                isCancelled: false,
                cancelToken,
                ...err.response,
              };
              // console.log(err);
              // rejectTo.message = err.response.message;
              if (status === statusCodes.unAuthorized && isAuthenticated) {
                logout();
                // return Promise.reject(rejectTo);
              }
              // if (err?.message === "Network Error" && !axios.isCancel(err)) {
              //   return Promise.reject(rejectTo);
              // }
              if (!axios.isCancel(err) && showMessageOnError) {
                ERROR.show(err.response);
              }
              if (axios.isCancel(err)) {
                rejectTo.isCancelled = true;
              }
              return Promise.reject(rejectTo);
            }
          };

          const handleResponse = (response) => {
            const { status, headers: responseHeaders } = response; // request status

            const isSuccess = status && String(status).startsWith("2"); // check if it's a success

            // handle server messages
            if (!isSuccess && showMessageOnError) ERROR.show(response);
            else toast(response.message, { type: "success" });
            // if (status === statusCodes.unAuthorized && isAuthenticated)
            //   return logout();
            const resolveTo = {
              success: isSuccess,
              headers: responseHeaders,
              cancelToken,
              isCancelled: false,
              ...response,
            };
            resolveTo.data = response.data.data;
            resolveTo.message = response.data.message;

            return Promise.resolve(resolveTo);
          };

          const logout = () => {
            USER.clear();
          };

          return sendRequest();
        };
      },
    }
  );
};

export const api = createApi();
