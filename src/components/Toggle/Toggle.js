import React, { useState } from "react";
// import { cn } from "../../utils/functions";
import styles from "./styles.module.css";

const Toggle = ({
  type = 1,
  onChange = (f) => f,
  name = "",
  classNames = { wrapper: "", thumb: "" },
  defaultState = false,
}) => {
  // states
  const [active, setActive] = useState(defaultState);

  //   function
  const handleChange = () => {
    onChange(!active, name);
    setActive(!active);
  };
  return (
    <>
      <section
        className={[
          styles.toggle,
          styles[`type${type}`],
          active ? styles.active : "",
          classNames.wrapper,
        ].join(" ")}
        onClick={handleChange}
      >
        {type === 3 && <div className={styles.type3Rect}></div>}
        <div className={[styles.thumb, styles[`type${type}`]].join(" ")}></div>
      </section>
    </>
  );
};

export default Toggle;
