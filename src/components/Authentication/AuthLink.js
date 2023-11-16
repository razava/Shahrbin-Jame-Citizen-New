import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { CN } from "../../utils/functions";
import styles from "./styles.module.css";

const AuthLink = ({ children, className = "", to = "" }) => {
  // hooks
  const { changeAuthMode } = useOutletContext();

  // functions
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    changeAuthMode(to);
  };
  return (
    <>
      <span
        className={CN.join(styles.authLink, className)}
        onClick={handleLinkClick}
      >
        {children}
      </span>
    </>
  );
};

export default AuthLink;
