import React, { useEffect, useState } from "react";
import { appRoutes, authModes } from "../../utils/variables";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import image1 from "../../assets/images/auth_image_1.png";
import image2 from "../../assets/images/auth_image_2.png";
import image3 from "../../assets/images/auth_image_3.png";
import image4 from "../../assets/images/auth_image_4.png";
import Supporters from "./Supporters";
import ExternalLinks from "./ExternalLinks";
import AuthNavigation from "./AuthNavigation";
import { CN } from "../../utils/functions";

const authModePositions = {
  intro: "right",
  signin: "right",
  signup: "left",
  verify: "right",
  forgotpass: "left",
  resetpass: "right",
  pnpAuth: "right",
};

const AuthenticationDesktop = ({ children }) => {
  // hooks
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // states
  const [authMode, setAuthMode] = useState(pathname.replace(/\/auth\//g, ""));
  const [isNavigating, setIsNavigating] = useState(false);
  const [position, setPosition] = useState(authModePositions[authMode]);

  // functions
  const changeAuthMode = (authMode) => {
    setAuthMode(authMode);
    setIsNavigating(false);
    // setTimeout(() => {
      navigate(appRoutes[authMode]);
    // }, 300);
  };

  // effects
  useEffect(() => {
    const authMode = pathname.replace(/\/auth\//g, "");
    if (authModes[authMode]) {
      setIsNavigating(true);
      setPosition(authModePositions[authMode]);
      setAuthMode(authMode);
    }
  }, [pathname]);

  useEffect(() => {
    // animate();
  }, [position]);

  // renders
  const renderPageSide = () => {
    return (
      <div className={CN.join(styles.d_pageSide, styles[position])}>
        <div className={styles.d_pageSideContent}>
          <img src={image1} />
          {/* <img src={image2} /> */}
          <img src={image3} />
          <Supporters />
        </div>
        <img src={image4} className={styles.d_pageSideBottomImage} />
      </div>
    );
  };
  return (
    <>
      <div className={styles.d_wrapper}>
        <div className={CN.join(styles.d_pageContent, styles[position])}>
          <AuthNavigation changeAuthMode={changeAuthMode} authMode={authMode} />
          {children({ authMode, changeAuthMode })}
        </div>
        {renderPageSide()}
      </div>
    </>
  );
};

export default AuthenticationDesktop;
