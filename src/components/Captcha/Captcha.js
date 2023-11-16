import React from "react";
import styles from "./styles.module.css";
import authStyles from "../Authentication/styles.module.css";
import TextInput from "../TextInput/TextInput";
import { CN } from "../../utils/functions";
import useCaptcha from "../../hooks/useCaptcha";
import Loader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Captcha = ({ children, error }) => {
  // hooks
  const {
    captchaValue,
    captchaKey,
    captcha,
    loading,
    setCaptchaValue,
    refresh,
  } = useCaptcha();
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <TextInput
            classNames={{
              wrapper: authStyles.authInputWrapper,
              input: CN.join(authStyles.authInput, styles.input),
            }}
            placeholder="عبارت امنیتی"
            onChange={setCaptchaValue}
            value={captchaValue}
            error={error}
          />
        </div>
        <div className={styles.captchaWrapper}>
          <div className={styles.captcha}>
            {loading ? <Loader /> : <img src={`${captcha}`} />}
          </div>
          <div className={styles.captchaActions}>
            <button
              type="button"
              onClick={refresh}
              className={styles.captchaAction}
            >
              <FontAwesomeIcon icon={"sync"} size={16} />
            </button>
          </div>
        </div>
      </div>
      {children({
        key: captchaKey,
        value: captchaValue,
        refresh,
        setValue: setCaptchaValue,
      })}
    </>
  );
};

export default Captcha;
