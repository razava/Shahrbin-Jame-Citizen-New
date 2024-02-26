import React from "react";
import styles from "./styles.module.css";
import { appRoutes, authModes } from "../../utils/variables";
import { useLocation, useNavigate } from "react-router-dom";
import { CN } from "../../utils/functions";

const AuthNavigation = ({ changeAuthMode = (f) => f }) => {
  // hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // variables
  const authMode = pathname.replace(/\/auth\//g, "");

  //   renders
  const renderNavigationLinks = () => {
    if (authMode === authModes.signin || authMode === authModes.signup)
      return (
        <>
          <div className={styles.authNavigation}>
            <span
              className={CN.join(
                styles.authNavigationLink,
                authMode === authModes.signin ? styles.active : ""
              )}
              onClick={() => changeAuthMode(authModes.signin)}
            >
              ورود
            </span>
            <span
              className={CN.join(
                styles.authNavigationLink,
                authMode === authModes.signup ? styles.active : ""
              )}
              onClick={() => changeAuthMode(authModes.signup)}
            >
              ثبت نام
            </span>
          </div>
        </>
      );
    else if (authMode !== authModes.intro)
      return (
        <div className={styles.authNavigation}>
          <span
            className={CN.join(styles.authNavigationLink, styles.active)}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </span>
        </div>
      );
  };
  return (
    <>
      {
        // renderNavigationLinks()
      }
    </>
  );
};

export default AuthNavigation;
