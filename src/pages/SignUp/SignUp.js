import React, { useState } from "react";
import styles from "./styles.module.css";
import authStyles from "../../components/Authentication/styles.module.css";
import TextInput from "../../components/TextInput/TextInput";
import Captcha from "../../components/Captcha/Captcha";
import Button from "../../components/Button/Button";
import AuthLink from "../../components/Authentication/AuthLink";
import {
  appRoutes,
  authModes,
  httpMethods,
  statusCodes,
  validationTypes,
} from "../../utils/variables";
import { api } from "../../services/http";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useValidation from "../../hooks/useValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckBox from "../../components/CheckBox/CheckBox";

const SignUp = () => {
  // states
  const [values, setValues] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // functions
  const handleChange = (value, name) => {
    let validator = {
      name: validationTypes.required,
      payload: { [name]: value },
    };
    validateOne([validator]);
    setValues({ ...values, [name]: value });
  };

  const handleSignUp = async (captcha) => {
    const validators = [
      {
        name: validationTypes.required,
        payload: { ...values, captchaValue: captcha.value },
      },
      {
        name: validationTypes.password,
        payload: { password: values.password },
      },
      {
        name: validationTypes.passwordMatch,
        payload: {
          confirmPassword: values.confirmPassword,
          password: values.password,
        },
        matchTo: "password",
      },
    ];
    if (!validate(validators)) return;
    else await makeRequest(captcha);
  };

  const signup = async (captcha) => {
    const payload = {
      username: values.phoneNumber,
      password: values.password,
      // captcha: {
      //   key: captcha.key,
      //   value: captcha.value,
      // },
      // captchaValue: captcha.value,
      // captchaKey: captcha.key,
    };
    try {
      await api.CitizenAccount({
        tail: "RegisterApp",
        payload,
        method: httpMethods.post,
        instanceId: 1,
      });
      captcha.refresh();
      captcha.setValue("");
    } catch (err) {
      if (err.status === statusCodes.requireVerification)
        navigate(appRoutes.verify, { state: { ...values, type: "signin" } });
      captcha.refresh();
      captcha.setValue("");
    }
  };

  // hooks
  const navigate = useNavigate();
  const { makeRequest, loading } = useFetch({
    fn: signup,
  });
  const { validate, validateOne, errors } = useValidation();

  // renders
  const renderFormInputs = () => {
    return (
      <>
        <TextInput
          label="تلفن همراه"
          placeholder="09"
          name="phoneNumber"
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
        <TextInput
          label="رمز عبور"
          placeholder="********"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          classNames={{
            wrapper: authStyles.authInputWrapper,
            input: authStyles.authInput,
          }}
          error={errors.password}
        />
        <TextInput
          label="تکرار رمز عبور"
          placeholder="********"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          classNames={{
            wrapper: authStyles.authInputWrapper,
            input: authStyles.authInput,
          }}
          error={errors.confirmPassword}
        />
      </>
    );
  };

  const renderPrivacyAndPolicy = () => {
    return (
      <div className={styles.pnpWrapper}>
        <AuthLink to={authModes.pnpAuth} className={styles.pnpLink}>
          <p>قوانین حفظ حریم خصوصی</p>
          <FontAwesomeIcon icon={"angle-left"} />
        </AuthLink>
        <div className={styles.pnpAgreement}>
          <p></p>
          <CheckBox
            size="small"
            option={{ label: "با قوانین و شرایط موافقم." }}
          />
        </div>
      </div>
    );
  };

  const renderCaptcha = () => {
    return (
      <Captcha error={errors.captchaValue}>
        {(captcha) => (
          <>
            {renderPrivacyAndPolicy()}
            <div className={authStyles.authButtonWrapper}>
              <Button
                className={authStyles.authButton}
                onClick={() => handleSignUp(captcha)}
                loading={loading}
                type="submit"
              >
                ثبت نام
              </Button>
            </div>
          </>
        )}
      </Captcha>
    );
  };

  const renderLinks = () => {
    return (
      <div className={authStyles.authLinks}>
        <AuthLink to={authModes.signin}>با حساب دیگری وارد شوید.</AuthLink>
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

export default SignUp;
