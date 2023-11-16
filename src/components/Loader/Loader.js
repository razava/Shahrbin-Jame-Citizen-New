import React from "react";
import styles from "./styles.module.css";

const Loader = ({ dotStyle = {}, dotClassName = "" }) => {
  return (
    <div className={styles.loader}>
      <div className={dotClassName} style={dotStyle}></div>
      <div className={dotClassName} style={dotStyle}></div>
      <div className={dotClassName} style={dotStyle}></div>
      <div className={dotClassName} style={dotStyle}></div>
    </div>
  );
};

export default Loader;
