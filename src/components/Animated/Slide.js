import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Slide = ({ style = {}, className = "", children, direction = "up" }) => {
  //   states
  const [show, setShow] = useState(false);

  //   functions
  const getTransformStyle = () => {
    if (direction === "up") return "translateY(2px)";
    else if (direction === "right") return "translateX(2px)";
    if (direction === "down") return "translateY(-2px)";
    if (direction === "left") return "translateX(2px)";
  };

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
            transform: show ? "translate(0, 0)" : getTransformStyle(),
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

export default Slide;
