import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { api } from "../services/http";
import { useQuery } from "@tanstack/react-query";
import { GetCaptcha } from "../services/AuthenticateApi";

const useCaptcha = () => {
  //   states
  const [captcha, setCaptcha] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");

  // functions
  const getCaptcha = async () => {
    const { success, data, headers } = await api.Authenticate({
      tail: "Captcha",
    });
    // if (success) {
    //   setCaptcha(data);
    //   if (headers["captcha-key"]) {
    //     setCaptchaKey(headers["captcha-key"]);
    //   }
    // }
  };
  // queries
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["Captcha"],
    queryFn: GetCaptcha,
  });

  useEffect(() => {
    if (data) {
      const srcForImage = data ? URL.createObjectURL(data.data) : null;
      setCaptcha(srcForImage);
      setCaptchaKey(data.headers["captcha-key"]);
    }
  }, [data]);

  console.log(data);
  //   hooks
  // const { makeRequest, loading } = useFetch({ fn: getCaptcha, auto: true });

  return {
    isLoading,
    captcha,
    captchaKey,
    captchaValue,
    refresh: refetch,
    setCaptchaValue,
  };
};

export default useCaptcha;
