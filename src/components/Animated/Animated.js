import React, { useEffect, useState } from "react";

const Animated = ({
  condition,
  animationType = "slidedown",
  children,
  onAnimationEnd = (f) => f,
  style = {},
  className = "",
}) => {
  // states
  const [animation, startAnimation] = useState(false);

  //   functions
  const getAnimationStyle = () => {
    if (!condition) return {};
    if (animationType === "slidedown") {
      return {
        transition: "all 0.75s",
        opacity: condition && animation ? 1 : 0,
        transform:
          condition && animation ? `translateY(0)` : `translateY(-20px)`,
      };
    } else if (animationType === "slideup") {
      return {
        transition: "all 0.75s",
        opacity: condition && animation ? 1 : 0,
        transform:
          condition && animation ? `translateY(0)` : `translateY(20px)`,
      };
    } else if (animationType === "fadeout")
      return {
        transition: "all 0.75s",
        opacity: condition && animation ? 0 : 1,
      };
  };

  const handleAnimationEnd = (e) => {
    if (animation && condition) onAnimationEnd(e);
  };

  //   effects
  useEffect(() => {
    if (condition) {
      setTimeout(() => {
        startAnimation(true);
      }, 100);
    }
  }, [condition]);
  return (
    <>
      <div
        style={{
          width: "100%",
          transition: "all 0.75s",
          ...getAnimationStyle(),
          ...style,
        }}
        onTransitionEnd={handleAnimationEnd}
        className={className}
      >
        {children}
      </div>
    </>
  );
};

export default Animated;
