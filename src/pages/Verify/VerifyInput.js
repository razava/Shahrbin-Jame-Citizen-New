import React from "react";
import styles from "./styles.module.css";

const VerifyInput = ({ onChange = (f) => f, style, index }) => {
  return (
    <>
      <input
        type="number"
        id="verifyInput"
        maxLength="1"
        size="1"
        min="0"
        max="9"
        pattern="[0-9]{1}"
        className={styles.verifyInput}
        style={style}
        onChange={(e) => onChange(e.target.value, index)}
      />
    </>
  );
};

export default VerifyInput;
