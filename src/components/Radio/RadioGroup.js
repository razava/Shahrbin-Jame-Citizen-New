import React, { useState } from "react";
import Radio from "./Radio";
import styles from "./radio.module.css";

const getRowStyle = (horizontal) => {
  if (horizontal) return styles.horizontal;
  else return styles.vertical;
};

const RadioGroup = ({
  label = "",
  nameKey = "title",
  valueKey = "value",
  name = "",
  defaultValue = {},
  options = [],
  horizontal = true,
  onChange = (f) => f,
  disabled = false,
  classNames = { wrapper: "", container: "", label: "", radio: {} },
  floatingLabel = false,
}) => {
  // states
  // ** data
  const [selected, setSelected] = useState(defaultValue);

  // styles
  const rowStyle = getRowStyle(horizontal);
  const wrapperClassName = [
    styles.wrapper,
    classNames.wrapper,
    disabled ? styles.disabled : "",
    floatingLabel ? styles.floatingLabel : "",
  ].join(" ");
  const containerClassName = [
    styles.container,
    classNames.container,
    rowStyle,
  ].join(" ");
  const labelClassName = [styles.label, classNames.label].join(" ");

  //   functions
  const onRadioClick = (option) => {
    setSelected(option);
    onChange(option, name);
  };
  return (
    <>
      <section className={wrapperClassName}>
        <span className={labelClassName}>{label}</span>
        <div className={containerClassName}>
          {options.map((option) => (
            <Radio
              key={option.id}
              option={option}
              checked={selected[valueKey] === option[valueKey]}
              nameKey={nameKey}
              onRadioClick={onRadioClick}
              classNames={classNames.radio}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default RadioGroup;
