import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import UserHeader from "./UserHeader";
import { useLocation, useNavigate } from "react-router-dom";
import UserBg from "./UserBg";
import { appRoutes } from "../../utils/variables";
import { CN } from "../../utils/functions";

const UserContainerMobile = ({ children }) => {
  // states
  const [state, setState] = useState({
    position: "",
    currentPage: "",
  });

  // hooks
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // variables

  // functions
  const startNavigation = (menuItem) => {
    setState({ position: "up", currentPage: menuItem.to });
  };

  const onAnimationEnd = () => {
    navigate(state.currentPage);
  };

  // effects
  useEffect(() => {
    if (pathname === appRoutes.menu) {
      setState({ position: "down", currentPage: undefined });
    } else {
      setState({ position: "up", currentPage: pathname });
    }
  }, [pathname]);
  return (
    <>
      <section className={styles.userContainer}>
        <UserBg position={state.position} onAnimationEnd={onAnimationEnd} />
        <UserHeader position={state.position} />
        <div className={CN.join(styles.userContent, styles[state.position])}>
          {children({ startNavigation })}
        </div>
      </section>
    </>
  );
};

export default UserContainerMobile;
