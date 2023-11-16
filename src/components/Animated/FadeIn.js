import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const FadeIn = ({ style = {}, className = "", children }) => {
  //   states
  const [show, setShow] = useState(false);

  //   effects
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 300);
  }, []);

  return (
    <>
      <div
        className={className}
        style={{
          ...{
            opacity: show ? 1 : 0,
            transform: show ? "scale(1)" : "scale(0)",
            transition: "all 0.3s",
          },
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default FadeIn;
