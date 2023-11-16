import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Button from "../../components/Button/Button";
import { useOutletContext } from "react-router-dom";
import { authModes } from "../../utils/variables";
import Supporters from "../../components/Authentication/Supporters";
import ExternalLinks from "../../components/Authentication/ExternalLinks";
import useResponsive from "../../hooks/useResponsive";

const Intro = () => {
  // hooks
  const { authMode, changeAuthMode } = useOutletContext();

  // effetcs
  useEffect(() => {}, [authMode]);

  // renders
  const renderMobileLogo = () => {
    return (
      <div className={styles.logoWrapper}>
        <img
          src={require(`../../assets/images/${process.env.REACT_APP_LOGO}`)}
          className={styles.logoImage}
        />
      </div>
    );
  };

  const renderTitle = () => {
    return (
      <div className={styles.titleWrapper}>
        <h1>شهربین</h1>
        <p>راه‌حلی برای مشکلات شهری</p>
      </div>
    );
  };

  const renderButton = () => {
    return (
      <div className={styles.btnWrapper}>
        <Button onClick={() => changeAuthMode(authModes.signin)}>
          بزن بریم
        </Button>
      </div>
    );
  };

  const renderSupporters = () => {
    return (
      <div className={styles.supporters}>
        <Supporters />
      </div>
    );
  };

  const renderExternalLinks = () => {
    return <ExternalLinks />;
  };

  return (
    <>
      {renderMobileLogo()}
      {renderTitle()}
      {renderButton()}
      {renderSupporters()}
      {renderExternalLinks()}
    </>
  );
};

export default Intro;
