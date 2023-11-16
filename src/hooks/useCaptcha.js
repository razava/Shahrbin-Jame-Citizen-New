import { useState } from "react";
import useFetch from "./useFetch";
import { api } from "../services/http";

const useCaptcha = () => {
  //   states
  const [captcha, setCaptcha] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");

  // functions
  const getCaptcha = async () => {
    const { success, data, headers } = await api.authenticate({
      tail: "captcha",
    });
    if (success) {
      setCaptcha(data);
      if (headers["captcha-key"]) {
        setCaptchaKey(headers["captcha-key"]);
      }
    }
  };

  //   hooks
  const { makeRequest, loading } = useFetch({ fn: getCaptcha, auto: true });

  return {
    loading,
    captcha,
    captchaKey,
    captchaValue,
    refresh: makeRequest,
    setCaptchaValue,
  };
};

export default useCaptcha;
