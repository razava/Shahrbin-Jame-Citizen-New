import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authStyles from "../../components/Authentication/styles.module.css";
import Button from "../../components/Button/Button";
import useAuthenticate from "../../hooks/useAuthenticate";
import useFetch from "../../hooks/useFetch";
import useResize from "../../hooks/useResize";
import { api } from "../../services/http";
import { appConstants, appRoutes, httpMethods } from "../../utils/variables";
import styles from "./styles.module.css";
import VerifyInput from "./VerifyInput";
import { LS } from "../../utils/functions";
import { useMutation } from "@tanstack/react-query";
import { resendOtp } from "../../services/AuthenticateApi";
import { toast } from "react-toastify";
import CountdownTimer from "./CountDown";
import OTPInput from "react-otp-input";

const total = 6;

const Verify = () => {
  // refs
  const inputsRef = useRef();
  const verificationCode = useRef([...Array(6)]);
  console.log(verificationCode);
  // states
  const [parentWidth, setParentWidth] = useState();
  const [isShow, setIsShow] = useState(true);
  const [otp, setOtp] = useState("");
  const space = "\xa0";

  // variables
  const length = parentWidth ? (parentWidth - (total - 1) * 10) / total : 40;
  const style = {
    width: length,
    height: length,
  };

  // functions
  function goToNextInput(e) {
    var key = e.target.value,
      t = e.target,
      sib = t.previousSibling;

    if (!sib) {
      t.blur();
      makeRequest();
      return;
    }
    sib.select();
    sib.focus();
  }

  function onKeyDown(e) {
    var key = e.which;

    if (
      key === 9 ||
      key === 8 ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105)
    ) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  function onFocus(e) {
    e.target.select();
  }

  const onCodeChnage = (value, index) => {
    verificationCode.current[index] = value;
  };

  const resendOtpMutation = useMutation({
    mutationKey: ["resendOtp"],
    mutationFn: resendOtp,
    onSuccess: (res) => {},
    onError: (err) => {
      if (err.response.status === 428) {
        console.log(err.response);
        localStorage.setItem(
          appConstants.SH_CT_OTP_TOKEN,
          err.response.data.value
        );
        toast("کد تایید مجدد ارسال شد.", { type: "info" });
        localStorage.removeItem("countdownTime");
        localStorage.removeItem("CountDownCompleted");
        setIsShow(true);
      } else {
        toast("مشکلی در ارسال درخواست به وجود آمد.", { type: "error" });
      }
    },
  });

  const handelResendOtp = () => {
    console.log(11);
    resendOtpMutation.mutate({
      otpToken: localStorage.getItem(appConstants.SH_CT_OTP_TOKEN),
    });
  };

  const handleVerify = async (e) => {
    const payload = {
      verificationCode: otp,
      otpToken: localStorage.getItem(appConstants.SH_CT_OTP_TOKEN),
    };
    try {
      const { success, data } = await api.Authenticate({
        // tail: state.type === "signin" ? "Verify" : "RequestToken",
        tail: "VerifyCitizen",
        payload,
        method: httpMethods.post,
      });
      if (success) {
        // if (state.type === "signin") onSignInSuccess(data);
        // else
        //   navigate(appRoutes.resetpass, {
        //     state: { token: data, userName: state.phoneNumber },
        //   });
        console.log(data);
        onSignInSuccess(data);
        navigate(appRoutes.menu);
      }
    } catch (err) {}
  };

  // hooks
  const { windowWidth } = useResize();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { onSignInSuccess } = useAuthenticate();
  const { loading, makeRequest } = useFetch({ fn: handleVerify });

  // effects
  useEffect(() => {
    const parentWidth = inputsRef.current?.offsetWidth || undefined;
    setParentWidth(parentWidth);
  }, [inputsRef.current, windowWidth]);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   const verifyInputs = document.querySelectorAll("#verifyInput");
  //   verifyInputs[verifyInputs.length - 1].select();
  //   verifyInputs.forEach((verifyInput) => {
  //     verifyInput.addEventListener("input", goToNextInput);
  //     verifyInput.addEventListener("keydown", onKeyDown);
  //     verifyInput.addEventListener("click", onFocus);
  //   });
  // }, []);

  useEffect(() => {
    console.log(otp);
    if (otp.length == 6) {
      console.log(1);
      if (localStorage.getItem("CountDownCompleted")) {
        resendOtpMutation.mutate({
          otpToken: JSON.parse(
            localStorage.getItem(appConstants.SH_CT_OTP_TOKEN)
          ),
        });
      } else {
        console.log(2);
        makeRequest();
      }
      // const payload = {
      //   otpToken: localStorage.getItem("verificationToken"),
      //   verificationCode: otp,
      // };
      // verifyMutation.mutate(payload);
    }
  }, [otp]);

  // renders
  const renderVerifyInputs = () => {
    return (
      <>
        <div className={styles.verifyInputs} ref={inputsRef}>
          {[...Array(6)].map((_, i) => (
            <VerifyInput onChange={onCodeChnage} index={i} style={style} />
          ))}
        </div>
      </>
    );
  };

  const renderButton = () => {
    return (
      <div className={authStyles.authButtonWrapper}>
        <Button
          className={authStyles.authButton}
          onClick={makeRequest}
          loading={loading}
          type="submit"
        >
          ارسال
        </Button>
      </div>
    );
  };
  return (
    <>
      <form className={authStyles.form}>
        <p className={authStyles.authTitle}>
          کد تایید ارسالی به تلفن خود را وارد نمایید.
        </p>
        {/* {renderVerifyInputs()} */}
        <div className="w-full mt-8 " dir="ltr">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>{space}</span>}
            renderInput={(props, idx) => (
              <input
                className="!text-2xl"
                autoFocus={idx == 0}
                pattern="[0-9]*"
                {...props}
              />
            )}
            containerStyle=" flex justify-center gap-2 flex-row-reverse"
            inputStyle=" !w-20 rounded-full h-20 bg-[#eee] border shadow-msm border-none text-black !text-4xl"
          />
        </div>
        <div className="mx-auto w-full text-center text-xl mt-10">
          {" "}
          <CountdownTimer
            setIsShow={(state) => setIsShow(state)}
            isShow={isShow}
          />
          {!isShow && (
            <p
              onClick={handelResendOtp}
              className=" text-[var(--blue)] text-xl cursor-pointer"
            >
              ارسال مجدد کد تایید
            </p>
          )}
        </div>
        {/* {renderButton()} */}
      </form>
    </>
  );
};

export default Verify;
