import React, { useRef } from "react";
import { CN } from "../../utils/functions";
import styles from "./styles.module.css";

const TextArea = ({
  placeholder = "",
  classNames = {
    wrapper: "",
    input: "",
    label: "",
    error: "",
    inputWrapper: "",
  },
  style = {
    wrapper: {},
    input: {},
    label: {},
    error: {},
    inputWrapper: {},
  },
  onChange = (f) => f,
  name = "",
  englishOnly = false,
  digitsOnly = false,
  floatingLabel = false,
  editable = true,
  value = "",
  defaultValue,
  maxLength = "",
  label = "",
  error = false,
  errorMessage = "",
}) => {
  // refs
  const inputRef = useRef(null);

  const hasError = Object.values(error).some((v) => v);

  // classNames
  const wrapperClassName = [styles.wrapper, classNames.wrapper].join(" ");
  const inputClassName = [
    styles.input,
    classNames.input,
    hasError ? styles.error : "",
  ].join(" ");
  const labelClassName = [
    styles.label,
    floatingLabel ? styles.floating : "",
    hasError ? styles.error : "",
    classNames.label,
  ].join(" ");
  const errorClassName = [styles.error, classNames.error].join(" ");

  //   functions
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") return onChange(e.target.value, name);
    if (englishOnly) {
      if (/[A-Za-z][A-Za-z0-9]*/.test(value) || /\d+/.test(value)) {
        if (digitsOnly) {
          if (/^\d+/.test(value)) {
            onChange(e.target.value, name);
          }
        } else {
          onChange(e.target.value, name);
        }
      }
    } else {
      if (digitsOnly) {
        if (/^\d+/.test(value)) {
          onChange(e.target.value, name);
        }
      } else {
        onChange(e.target.value, name);
      }
    }
  };

  return (
    <>
      <section className={wrapperClassName} style={style.wrapper}>
        {label && (
          <span className={labelClassName} style={style.label}>
            {label}
          </span>
        )}
        <div
          className={CN.join(styles.inputWrapper, classNames.inputWrapper)}
          style={style.inputWrapper}
        >
          <textarea
            placeholder={placeholder}
            className={inputClassName}
            onChange={onChange ? handleChange : undefined}
            value={value !== null && value !== undefined ? value : ""}
            defaultValue={defaultValue}
            maxLength={maxLength}
            ref={inputRef}
            style={style.input}
            readOnly={!editable}
          />
        </div>
        {error && (
          <span className={errorClassName} style={style.error}>
            {errorMessage}
          </span>
        )}
      </section>
    </>
  );
};

export default TextArea;
