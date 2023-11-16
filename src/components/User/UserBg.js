import React, { useEffect, useState } from "react";
import useResize from "../../hooks/useResize";
import styles from "./styles.module.css";
import animejs from "animejs/lib/anime.es";
import underlayImage from "../../assets/images/shahrbin-banner.png";
import { CN } from "../../utils/functions";

const UserBg = ({ position = "down", onAnimationEnd = (f) => f }) => {
  //   states
  const [svgHeight, setSvgHeight] = useState(window.innerHeight);

  // hooks
  const { windowWidth, windowHeight } = useResize();

  // functions
  const getDefaultPath = (position) => {
    const svgHeight = position === "up" ? windowHeight / 3 : windowHeight + 100;
    return `M0 0 L0 0 L0 ${svgHeight - 100} C${
      window.innerWidth / 4
    } ${svgHeight}, ${(window.innerWidth * 3) / 4} ${svgHeight}, ${
      window.innerWidth
    } ${svgHeight - 100} L${window.innerWidth} 0 L0 0  Z`;
  };

  const getOverlayPath = (svgHeight) => {
    return `M0 0 L0 0 L0 ${svgHeight - 100} C${windowWidth / 4} ${svgHeight}, ${
      (windowWidth * 3) / 4
    } ${svgHeight}, ${windowWidth} ${
      svgHeight - 100
    } L${windowWidth} 0 L0 0  Z`;
  };

  const morph = (position) => {
    const svgHeight = position === "up" ? windowHeight / 3 : windowHeight + 100;
    const timeline = animejs.timeline({
      duration: 500,
      easing: "easeOutExpo",
    });
    timeline.add({
      targets: ["svg", "#underlayPath"],
      d: [
        {
          value: getOverlayPath(svgHeight),
        },
      ],
      viewBox: `0 0 ${windowWidth} ${svgHeight}`,
      // easing: "cubicBezier(.25,.75,.5,1.25)",
      begin: () => {
        setSvgHeight(svgHeight);
      },
      complete: position === "up" ? onAnimationEnd : undefined,
    });
  };

  //   effects
  useEffect(() => {
    morph(position);
  }, [position]);

  //   renders
  const renderUnderlay = () => {
    return (
      <div className={CN.join(styles.underlayImage, styles[position])}>
        <img src={underlayImage} />
      </div>
    );
  };

  return (
    <>
      <svg
        viewBox={`0 0 ${windowWidth} ${svgHeight + 100}`}
        className={styles.userBg}
      >
        <path
          d={getOverlayPath(svgHeight)}
          fill={"var(--yellow)"}
          fillOpacity={1}
          id={"underlayPath"}
        />
      </svg>
      {renderUnderlay()}
    </>
  );
};

export default UserBg;
