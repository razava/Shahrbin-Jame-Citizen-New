import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Staggered = ({
  children,
  className = "",
  reverse = false,
  onAnimationEnd = (f) => f,
  ...rest
}) => {
  //   states
  const [show, setShow] = useState(false);

  // functions
  const handleTransitionEnd = (e) => {
    if (e.propertyName === "transform") onAnimationEnd();
  };

  //   effects
  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 300);
  }, [reverse]);
  return (
    <>
      {React.Children.map(children, (child, index) => {
        const style = {
          transition: `transform 0.3s ${index * 0.07}s, opacity 0.3s ${
            index * 0.07
          }s, background 0.2s`,
          transform: reverse
            ? show
              ? "scale(0)"
              : "scale(1)"
            : show
            ? "scale(1)"
            : "scale(0)",
          opacity: reverse ? (show ? 0 : 1) : show ? 1 : 0,
        };

        const onTransitionEnd =
          index === children.length - 1 ? handleTransitionEnd : undefined;
        return (
          <div
            style={style}
            className={className}
            onTransitionEnd={onTransitionEnd}
            {...rest}
          >
            {child}
          </div>
        );
      })}
    </>
  );
};

export default Staggered;
