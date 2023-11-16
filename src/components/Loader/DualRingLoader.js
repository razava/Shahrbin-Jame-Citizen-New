import React from "react";
import { CN } from "../../utils/functions";
import styles from "./styles.module.css";

const DualRingLoader = ({ style = {}, size = "medium" }) => {
  // functions
  const getSizeClassName = (size) => {
    if (size === "medium") return styles.medium;
    else if (size === "large") return styles.large;
    else if (size === "small") return styles.small;
    else return styles.medium;
  };
  return (
    <>
      <div
        className={CN.join(styles.dualRing, getSizeClassName(size))}
        style={style}
      ></div>
    </>
  );
};

export default DualRingLoader;
