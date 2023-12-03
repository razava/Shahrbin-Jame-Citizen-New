import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authStyles from "../../components/Authentication/styles.module.css";
import Button from "../../components/Button/Button";
import Captcha from "../../components/Captcha/Captcha";
import TextInput from "../../components/TextInput/TextInput";
import useFetch from "../../hooks/useFetch";
import useValidation from "../../hooks/useValidation";
import { api } from "../../services/http";
import {
  appRoutes,
  httpMethods,
  statusCodes,
  validationTypes,
} from "../../utils/variables";

const ForgotPass = () => {
  // states
  const [values, setValues] = useState({
    phoneNumber: "",
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

  const handleSendCode = async (captcha) => {
    const validator = {
      name: validationTypes.required,
      payload: { ...values, captchaValue: captcha.value },
    };
    if (!validate([validator])) return;
    else await makeRequest(captcha);
  };

  const sendCode = async (captcha) => {
    const payload = {
      username: values.phoneNumber,
      captchaValue: captcha.value,
      captchaKey: captcha.key,
    };
    try {
      await api.CitizenAccount({
        tail: "ForgotPasswod",
        payload,
        method: httpMethods.post,
      });
      captcha.refresh();
      captcha.setValue("");
    } catch (err) {
      if (err.status === statusCodes.requireVerification)
        navigate(appRoutes.verify, {
          state: { ...values, type: "forgotpass" },
        });
      captcha.refresh();
      captcha.setValue("");
    }
  };

  // hooks
  const navigate = useNavigate();
  const { makeRequest, loading } = useFetch({
    fn: sendCode,
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
              onClick={() => handleSendCode(captcha)}
              loading={loading}
              type="submit"
            >
              تایید
            </Button>
          </div>
        )}
      </Captcha>
    );
  };
  return (
    <>
      <form className={authStyles.form}>
        {renderFormInputs()}
        {renderCaptcha()}
      </form>
    </>
  );
};

export default ForgotPass;
