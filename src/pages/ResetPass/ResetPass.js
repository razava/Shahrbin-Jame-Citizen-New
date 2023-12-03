import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authStyles from "../../components/Authentication/styles.module.css";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import useFetch from "../../hooks/useFetch";
import useValidation from "../../hooks/useValidation";
import { api } from "../../services/http";
import { appRoutes, httpMethods, validationTypes } from "../../utils/variables";

const ResetPass = () => {
  // states
  const [values, setValues] = useState({
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

  const handleResetPass = async () => {
    const validators = [
      {
        name: validationTypes.required,
        payload: values,
      },
      {
        name: validationTypes.password,
        payload: values,
      },
      {
        name: validationTypes.passwordMatch,
        payload: values,
        matchTo: "password",
      },
    ];
    if (!validate(validators)) return;
    else await makeRequest();
  };

  const resetPass = async () => {
    const payload = {
      username: state.userName,
      password: values.password,
      verificationCode: state.token,
    };
    try {
      const { success } = await api.CitizenAccount({
        tail: "ResetPassword",
        payload,
        method: httpMethods.post,
      });
      if (success) {
        navigate(appRoutes.signin);
        toast("رمز عبور با موفقیت تغیر یافت.", { type: "success" });
      }
    } catch (err) {}
  };

  // hooks
  const navigate = useNavigate();
  const { state } = useLocation();
  const { makeRequest, loading } = useFetch({
    fn: resetPass,
  });
  const { validate, validateOne, errors } = useValidation();

  // renders
  const renderFormInputs = () => {
    return (
      <>
        <TextInput
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
        />
        <TextInput
          label="تکرار گذرواژه"
          type="password"
          name="confirmPassword"
          placeholder="********"
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

  const renderButton = () => {
    return (
      <div className={authStyles.authButtonWrapper}>
        <Button
          className={authStyles.authButton}
          onClick={handleResetPass}
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
        {renderFormInputs()}
        {renderButton()}
      </form>
    </>
  );
};

export default ResetPass;
