import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "./checkbox.module.css";

const getSizeStyle = (size) => {
  switch (size) {
    case "small":
      return styles.small;
    case "medium":
      return styles.medium;
    case "large":
      return styles.large;
    default:
      return styles.small;
  }
};

const CheckBox = ({
  checked = false,
  size = "medium",
  name = "",
  onChange = (f) => f,
  option = {},
  classNames = {
    wrapper: "",
    checkboxShow: "",
    checkboxHide: "",
    iconShow: "",
    iconHide: "",
    label: "",
  },
  nameKey = "label",
}) => {
  //   states
  //  ** flags
  const [isChecked, setIsChecked] = useState(checked);

  // styles
  const sizeStyle = getSizeStyle(size);
  const checkBoxWrapperClassName = [styles.wrapper, classNames.wrapper].join(
    " "
  );
  const checkBoxClassName = [
    styles.checkbox,
    sizeStyle,
    isChecked ? styles.show : styles.hide,
    isChecked ? classNames.checkboxShow : classNames.checkboxHide,
  ].join(" ");
  const checkIconClassName = [
    styles.checkIcon,
    sizeStyle,
    isChecked ? styles.show : styles.hide,
    isChecked ? classNames.iconShow : classNames.iconHide,
  ].join(" ");
  const labelClassName = [styles.label, sizeStyle, classNames.label].join(" ");

  //   functions
  const onCheckBoxClick = () => {
    setIsChecked(!isChecked);
    onChange({ ...option, isChecked: !checked }, name);
  };

  //   effects
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  //   renders
  const renderLabel = () =>
    option[nameKey] ? (
      <span className={labelClassName}>{option[nameKey]}</span>
    ) : null;
  return (
    <>
      <section className={checkBoxWrapperClassName} onClick={onCheckBoxClick}>
        {renderLabel()}
        <span className={checkBoxClassName}>
          <FontAwesomeIcon icon={"check"} className={checkIconClassName} />
        </span>
      </section>
    </>
  );
};

export default CheckBox;
