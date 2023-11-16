import React, { useEffect, useState } from "react";
import { CN } from "../../utils/functions";
import styles from "./styles.module.css";

const Icon = ({
  type = "fas",
  name = "",
  size = "",
  color = "",
  className,
  onClick = (f) => f,
  style = { icon: {} },
}) => {
  // states
  const [show, setShow] = useState(false);

  const iconStyle = {
    color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  if (color) iconStyle.color = color;
  if (size) iconStyle.fontSize = size;

  // effects
  useEffect(() => {
    // setTimeout(() => {
    setShow(true);
    // }, 100);
  }, []);
  return (
    <>
      {show && (
        <span
          key={type + name}
          style={{ ...iconStyle, ...style.icon }}
          className={CN.join(
            styles.icon,
            //  show ? styles.show : "",
            className
          )}
          onClick={onClick}
        >
          <i className={`${type} fa-${name}`}></i>
        </span>
      )}
    </>
  );
};

export default Icon;
