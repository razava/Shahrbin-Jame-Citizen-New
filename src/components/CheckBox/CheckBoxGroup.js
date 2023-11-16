import React, { useEffect, useState } from "react";
import { cn } from "../../utils/functions";
import CheckBox from "./CheckBox";
import styles from "./checkbox.module.css";

const CheckBoxGroup = ({
  label = "",
  onChange = (f) => f,
  name = "",
  options = [],
  defaultSelecteds = [],
  valueKey = "id",
  nameKey = "label",
  classNames = { wrapper: "", label: "", container: "", checkbox: {} },
  floatingLabel = false,
}) => {
  //   states
  const [values, setValues] = useState([]);

  const handleChange = (value) => {
    const newValues = values.map((v) => {
      if (value[valueKey] === v[valueKey]) {
        v.isChecked = !v.isChecked;
        return v;
      } else return v;
    });
    setValues(newValues);
    onChange(newValues, name);
  };

  useEffect(() => {
    const newValues = options.map((o) => ({
      ...o,
      isChecked: !!defaultSelecteds.find((s) => s[valueKey] === o[valueKey]),
    }));
    setValues(newValues);
  }, [defaultSelecteds]);
  return (
    <>
      <section
        className={cn(
          styles.checkBoxGroup,
          floatingLabel ? styles.floatingLabel : "",
          classNames.wrapper
        )}
      >
        {label && (
          <span className={cn(styles.groupLabel, classNames.label)}>
            {label}
          </span>
        )}
        <div className={cn(styles.checkboxes, classNames.container)}>
          {values.map((option, i) => (
            <CheckBox
              key={option[valueKey]}
              option={option}
              onChange={(value) => handleChange(value, i)}
              checked={option.isChecked}
              nameKey={nameKey}
              classNames={classNames.checkbox}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default React.memo(CheckBoxGroup);
