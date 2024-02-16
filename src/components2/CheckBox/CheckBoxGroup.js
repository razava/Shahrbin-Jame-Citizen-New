import React, { useEffect, useState } from "react";
import CheckBox from "./CheckBox";
import styles from "./checkbox.module.css";

const CheckBoxGroup = ({
  label = "",
  onChange = (f) => f,
  name = "",
  options = [],
  defaultSelecteds = [],
}) => {
  //   states
  const [values, setValues] = useState(defaultSelecteds);

  const handleChange = (value, index) => {
    const newValues = values;
    console.log(newValues);
    console.log(value);
    newValues[index] = value;
    console.log(values);
    setValues(newValues);
    onChange(newValues, name);
  };

  // useEffect(() => {
  //   setValues(defaultSelecteds);
  // }, [defaultSelecteds]);
  return (
    <>
      <section className={styles.checkBoxGroup}>
        {label && <span className={styles.groupLabel}>{label}</span>}
        <div className={styles.checkboxes}>
          {options.map((option, i) => (
            <CheckBox
              key={option.id}
              {...option}
              onChange={(value) => handleChange(value, i)}
              checked={values[i]}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CheckBoxGroup;
