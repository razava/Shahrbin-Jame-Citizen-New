import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import authStyles from "../../components/Authentication/styles.module.css";
import TextInput from "../../components/TextInput/TextInput";
import useAuthenticate from "../../hooks/useAuthenticate";
import Captcha from "../../components/Captcha/Captcha";
import Button from "../../components/Button/Button";
import AuthLink from "../../components/Authentication/AuthLink";
import {
  appConstants,
  appRoutes,
  authModes,
  httpMethods,
  statusCodes,
  validationTypes,
} from "../../utils/variables";
import { api } from "../../services/http";
import { useNavigate, useOutletContext } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useValidation from "../../hooks/useValidation";
import { LS } from "../../utils/functions";

const SignIn = () => {
  // states
  const [values, setValues] = useState({
    phoneNumber: "",
    // password: "",
  });
  useEffect(() => {
    localStorage.removeItem("countdownTime");
    localStorage.removeItem("CountDownCompleted");
    localStorage.removeItem(appConstants.SH_CT_OTP_TOKEN);
  }, []);

  // functions
  const handleChange = (value, name) => {
    let validator = {
      name: validationTypes.required,
      payload: { [name]: value },
    };
    validateOne([validator]);
    setValues({ ...values, [name]: value });
  };

  const handleSignIn = async (captcha) => {
    const validator = {
      name: validationTypes.required,
      payload: { ...values, captchaValue: captcha.value },
    };
    if (!validate([validator])) return;
    else await makeRequest(captcha);
  };

  const signin = async (captcha) => {
    const payload = {
      phoneNumber: values.phoneNumber,
      captcha: {
        key: captcha.key,
        value: captcha.value,
      },
    };
    try {
      const { success, data, status } = await api.Authenticate({
        tail: "LogisterCitizen",
        payload,
        method: httpMethods.post,
        isPerInstance: false,
      });
      captcha.refresh();
      captcha.setValue("");
      if (success) {
        navigate(appRoutes.verify);
        // LS.save(appConstants.SH_CT_OTP_TOKEN, data);
        localStorage.setItem(appConstants.SH_CT_OTP_TOKEN, data);
      }
      // if (success) onSignInSuccess(data);
    } catch (err) {
      if (err.status === statusCodes.requireVerification)
        navigate(appRoutes.verify, { state: { ...values, type: "signin" } });
      captcha.refresh();
      captcha.setValue("");
    }
  };

  // hooks
  const { onSignInSuccess } = useAuthenticate();
  const navigate = useNavigate();
  const { makeRequest, loading } = useFetch({
    fn: signin,
  });
  const { validate, validateOne, errors } = useValidation();

  // renders
  const renderFormInputs = () => {
    return (
      <>
        <TextInput
          label="تلفن همراه"
          name="phoneNumber"
          placeholder="09"
          value={values.phoneNumber}
          onChange={handleChange}
          digitsOnly={true}
          maxLength={"11"}
          classNames={{
            wrapper: authStyles.authInputWrapper,
            input: authStyles.authInput,
          }}
          error={errors.phoneNumber}
        />
        {/* <TextInput
          label="گذرواژه"
          type="password"
          name="password"
          placeholder="********"
          value={values.password}
          onChange={handleChange}
          classNames={{
            wrapper: authStyles.authInputWrapper,
            input: authStyles.authInput,
          }}
          error={errors.password}
        /> */}
      </>
    );
  };

  const renderCaptcha = () => {
    return (
      <Captcha error={errors.captchaValue}>
        {(captcha) => (
          <div className={authStyles.authButtonWrapper}>
            <Button
              className={authStyles.authButton}
              onClick={() => handleSignIn(captcha)}
              loading={loading}
              type="submit"
            >
              ورود
            </Button>
          </div>
        )}
      </Captcha>
    );
  };

  const renderLinks = () => {
    return (
      <div className={authStyles.authLinks}>
        {process.env.REACT_APP_MY_GOV_LINK && (
          <a
            href={process.env.REACT_APP_MY_GOV_LINK}
            className={authStyles.authLink}
          >
            ورود با یزد من
          </a>
        )}
        {/* <AuthLink to={authModes.signup}>حساب جدیدی ایجاد کنید.</AuthLink>
        <AuthLink to={authModes.forgotpass}>
          رمز عبور خود را فراموش کرده‌اید؟
        </AuthLink> */}
      </div>
    );
  };
  return (
    <>
      <form className={authStyles.form}>
        {renderFormInputs()}
        {renderCaptcha()}
        {renderLinks()}
      </form>
    </>
  );
};

export default SignIn;
