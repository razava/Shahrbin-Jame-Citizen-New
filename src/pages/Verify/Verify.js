import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authStyles from "../../components/Authentication/styles.module.css";
import Button from "../../components/Button/Button";
import useAuthenticate from "../../hooks/useAuthenticate";
import useFetch from "../../hooks/useFetch";
import useResize from "../../hooks/useResize";
import { api } from "../../services/http";
import { appRoutes, httpMethods } from "../../utils/variables";
import styles from "./styles.module.css";
import VerifyInput from "./VerifyInput";

const total = 6;

const Verify = () => {
  // refs
  const inputsRef = useRef();
  const verificationCode = useRef([...Array(6)]);

  // states
  const [parentWidth, setParentWidth] = useState();

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

  const handleVerify = async (e) => {
    const payload = {
      username: state.phoneNumber,
      verificationCode: verificationCode.current.reverse().join(""),
      password: state.password || "string",
      recaptchaToken: "string",
    };
    try {
      const { success, data } = await api.authenticate({
        tail: state.type === "signin" ? "verify" : "requestToken",
        payload,
        method: httpMethods.post,
      });
      if (success) {
        if (state.type === "signin") onSignInSuccess(data);
        else
          navigate(appRoutes.resetpass, {
            state: { token: data, userName: state.phoneNumber },
          });
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

  useEffect(() => {
    const verifyInputs = document.querySelectorAll("#verifyInput");
    verifyInputs[verifyInputs.length - 1].select();
    verifyInputs.forEach((verifyInput) => {
      verifyInput.addEventListener("input", goToNextInput);
      verifyInput.addEventListener("keydown", onKeyDown);
      verifyInput.addEventListener("click", onFocus);
    });
  }, []);

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
        {renderVerifyInputs()}
        {renderButton()}
      </form>
    </>
  );
};

export default Verify;
