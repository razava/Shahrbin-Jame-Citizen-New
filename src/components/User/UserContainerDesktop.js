import React, { useContext } from "react";
import styles from "./styles.module.css";
import UserHeader from "./UserHeader";
import { menuItems } from "../../pages/Menu/constants";
import { useLocation } from "react-router-dom";
import SideMenu from "../../pages/Menu/SideMenu";
import { AppStore } from "../../store/AppContext";
import { CN } from "../../utils/functions";

const UserContainerDesktop = ({ children }) => {
  // store
  const [store] = useContext(AppStore);

  // hooks
  const { pathname } = useLocation();

  // functions
  // const startNavigation = (menuItem) => {
  //   setState({ position: "up", currentPage: menuItem.to });
  // };

  //   variables
  const isMenuItemPage = !!menuItems.find((item) => item.to === pathname);

  return (
    <>
      <main className={styles.d_userContainer}>
        <UserHeader />
        <SideMenu />
        <div
          className={CN.join(
            styles.d_userContent,
            store.sideMenu ? styles.open : ""
          )}
        >
          {children({})}
        </div>
      </main>
    </>
  );
};

export default UserContainerDesktop;
