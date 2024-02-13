import React, { useRef, useState } from "react";
import useFields from "../../../assets2/hooks/useFields";
import styles from "../styles.module.css";

const Color = ({ props = {} }) => {
  // refs
  const inputRef = useRef();

  // hooks
  const { addChange, store } = useFields();

  //   states
  const [color, setColor] = useState(props?.style?.input?.color || "#000");

  const style = {
    backgroundColor: color,
  };

  const inputStyle = {
    opacity: 0,
    zIndex: -1000,
  };

  const handleChange = (e) => {
    setColor(e.target.value);
    addChange({
      style: {
        ...store.edit?.field?.props?.style,
        ...{
          input: {
            ...store.edit?.field?.props?.style.input,
            color: e.target.value,
          },
        },
      },
    });
  };
  return (
    <>
      <section className={styles.group}>
        <span className={styles.label}>رنگ متن</span>
        <input
          type={"color"}
          ref={inputRef}
          onChange={handleChange}
          style={inputStyle}
        />
        <div
          className={styles.colorInput}
          style={style}
          onClick={() => inputRef.current.click()}
        ></div>
      </section>
    </>
  );
};

export default Color;
