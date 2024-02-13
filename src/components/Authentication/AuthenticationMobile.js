import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import img1 from "../../assets/images/auth_image_4.png";
import useResize from "../../hooks/useResize";
import { appRoutes, authModes } from "../../utils/variables";
import animejs from "animejs/lib/anime.es";
import { useLocation, useNavigate } from "react-router-dom";
import { CN } from "../../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthenticationMobile = ({ children }) => {
  // states
  const [authMode, setAuthMode] = useState(authModes.signin);
  const [overlayPosition, setOverlayPosition] = useState("down");
  const [svgHeight, setSvgHeight] = useState(window.innerHeight / 2);
  const [isNavigating, setIsNavigating] = useState(false);

  // hooks
  const { windowWidth, windowHeight } = useResize();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // variables

  // functions
  const getOverlayPath = (svgHeight) => {
    return `M0,${svgHeight - 100} C${windowWidth / 4} ${svgHeight}, ${
      (windowWidth * 3) / 4
    } ${svgHeight}, ${windowWidth} ${
      svgHeight - 100
    } L${windowWidth} 0, L0 0, L0 ${svgHeight - 100} Z`;
  };

  const getDefaultOverlayPath = () => {
    const svgHeight = window.innerHeight / 2;

    return `M0,${svgHeight - 100} C${window.innerWidth / 4} ${svgHeight}, ${
      (window.innerWidth * 3) / 4
    } ${svgHeight}, ${window.innerWidth} ${svgHeight - 100} L${
      window.innerWidth
    } 0, L0 0, L0 ${svgHeight - 100} Z`;
  };

  const animate = () => {
    const svgHeight =
      overlayPosition === "up" ? windowHeight / 3 : windowHeight / 2;
    setIsNavigating(true);
    const timeline = animejs.timeline({
      duration: 500,
      easing: "easeOutExpo",
    });
    timeline.add({
      targets: ["svg", "#overlayPath"],
      d: [
        {
          value: getOverlayPath(svgHeight),
        },
      ],
      viewBox: `0 0 ${windowWidth} ${svgHeight}`,
      easing: "cubicBezier(.25,.75,.5,1.25)",
      begin: () => {
        setSvgHeight(svgHeight);
      },
    });
  };

  const changeAuthMode = (authMode) => {
    setAuthMode(authMode);
    setIsNavigating(false);
    setTimeout(() => {
      navigate(appRoutes[authMode]);
    }, 300);
  };

  const handleBackButton = () => {
    setIsNavigating(false);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  // renders
  const renderOverlay = () => {
    return (
      <>
        <section className={styles.overlayWrapper}>
          <svg
            viewBox={`0 0 ${windowWidth} ${svgHeight}`}
            className={styles.overlay}
          >
            <path
              id={"overlayPath"}
              fill="var(--yellow)"
              fillOpacity={1}
              d={getDefaultOverlayPath()}
            ></path>
          </svg>
          <div
            className={styles.authImageWrapper}
            style={{ height: svgHeight - 25 }}
          >
            <img
              src={img1}
              width={windowWidth}
              height={150}
              className={styles.authImage}
            />
          </div>
          {renderBackButton()}
        </section>
      </>
    );
  };

  const renderBackButton = () => {
    if (authMode !== authModes.intro)
      return (
        <div className={styles.backButton} onClick={handleBackButton}>
          <FontAwesomeIcon icon={"angle-left"} />
        </div>
      );
  };

  useEffect(() => {
    const authMode = String(pathname).split("/auth/")?.[1];
    const newPosition = authMode === authModes.intro ? "down" : "up";
    if (authModes[authMode]) {
      if (newPosition !== overlayPosition) {
        setOverlayPosition(newPosition);
      } else {
        setIsNavigating(true);
      }
      setAuthMode(authMode);
    }
  }, [pathname]);

  useEffect(() => {
    animate();
  }, [overlayPosition]);

  return (
    <>
      <section className={styles.authPage}>
        {renderOverlay()}
        <section
          className={CN.join(
            styles.authContent,
            isNavigating ? styles.isNavigating : ""
          )}
        >
          {children({ authMode, changeAuthMode })}
        </section>
      </section>
    </>
  );
};

export default AuthenticationMobile;
