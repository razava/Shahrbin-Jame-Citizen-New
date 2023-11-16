import React, { useEffect, useRef, useState } from "react";
import { CN, ERROR } from "../../utils/functions";
import Icon from "../Icon/Icon";
import styles from "./style.module.css";

const TextInput = ({
  icon = "",
  type = "",
  placeholder = "",
  classNames = {
    wrapper: "",
    input: "",
    icon: "",
    label: "",
    error: "",
    controls: "",
    control: "",
    inputWrapper: "",
  },
  onChange = (f) => f,
  onClick = (f) => f,
  onFocus = (f) => f,
  onBlur = (f) => f,
  onIconClick = (f) => f,
  renderAfterInput = (f) => f,
  name = "",
  englishOnly = false,
  digitsOnly = false,
  editable = true,
  floatingLabel = false,
  value = "",
  defaultValue,
  maxLength = "",
  label = "",
  error = false,
  controls = false,
  step = 1,
  precision = 1,
  min,
  max,
  forwardInputRef,
}) => {
  // refs
  const inputRef = useRef(null);

    forwardInputRef = {
      current: inputRef?.current,
    };


  // states
  const [inputType, setInputType] = useState(type);

  const hasError = Object.values(error).some((v) => v);

  // classNames
  const wrapperClassName = [styles.wrapper, classNames.wrapper].join(" ");
  const iconClassName = [
    styles.icon,
    hasError ? styles.hasError : "",
    classNames.icon,
  ].join(" ");
  const inputClassName = [
    styles.input,
    classNames.input,
    hasError ? styles.hasError : "",
  ].join(" ");
  const labelClassName = [
    styles.label,
    floatingLabel ? styles.floating : "",
    classNames.label,
  ].join(" ");
  const errorClassName = [
    styles.error,
    hasError ? styles.hasError : "",
    classNames.error,
  ].join(" ");
  const controlsClassName = [styles.controls, classNames.controls].join(" ");
  const controlClassName = [styles.control, classNames.control].join(" ");

  //   functions
  const handleChange = (e) => {
    if (!onChange) return;
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

  const increment = (e) => {
    e.stopPropagation();
    const change = step / Math.pow(10, precision);
    const changeTo = value
      ? parseFloat(value) + parseFloat(change)
      : parseFloat(change);
    onChange(changeTo.toFixed(precision), name);
  };

  const decrement = (e) => {
    e.stopPropagation();
    const change = step / Math.pow(10, precision);
    const changeTo = parseFloat(value)
      ? parseFloat(value) - parseFloat(change)
      : 0;
    onChange(changeTo.toFixed(precision), name);
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    onIconClick(e);
  };

  const togglePasswordView = (e) => {
    e.stopPropagation();
    setInputType(inputType === "text" ? "password" : "text");
  };
  return (
    <>
      <section className={wrapperClassName}>
        {label && <span className={labelClassName}>{label}</span>}
        <div className={CN.join(styles.inputWrapper, classNames.inputWrapper)}>
          <input
            type={inputType}
            placeholder={
              hasError ? `${ERROR.getValidationError(error)}` : placeholder
            }
            className={inputClassName}
            onChange={handleChange}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value !== null && value !== undefined ? value : ""}
            defaultValue={defaultValue}
            maxLength={maxLength}
            readOnly={!editable}
            ref={inputRef}
            min={min}
            max={max}
          />
          {renderAfterInput()}
          {icon && (
            <>
              <Icon
                name={icon}
                key={icon}
                // classNames={{ icon: iconClassName }}
                className={iconClassName}
                onClick={handleIconClick}
              />
            </>
          )}
          {type === "password" && (
            <>
              <Icon
                name={inputType === "text" ? "eye-slash" : "eye"}
                className={styles.showPassIcon}
                onClick={togglePasswordView}
              />
            </>
          )}
        </div>
        <span className={errorClassName}>
          {ERROR.getValidationError(error)}
        </span>

        {controls && (
          <span className={controlsClassName}>
            <span
              className={controlClassName}
              key={"plus-control"}
              onClick={increment}
            >
              <i className="fa-solid fa-plus"></i>
            </span>
            <span
              className={controlClassName}
              key={"minus-control"}
              onClick={decrement}
            >
              <i className="fa-solid fa-minus"></i>
            </span>
          </span>
        )}
      </section>
    </>
  );
};

export default TextInput;
