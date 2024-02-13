import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import { menuItems } from "./constants";
import { Link, useLocation } from "react-router-dom";
import { CN } from "../../utils/functions";
import { AppStore } from "../../store/AppContext";
import Icon from "../../components/Icon/Icon";
import { appActions } from "../../utils/variables";
import classNames from "classnames";

const SideMenu = () => {
  // store
  const [store, dispatch] = useContext(AppStore);
  const { sideMenu } = store;

  // states
  const [isAnimating, setIsAnimating] = useState(false);
  const boldMenus = ["ثبت درخواست", "ثبت شکایت"];

  // hooks
  const { pathname } = useLocation();

  // functions
  const toggleSideMenu = () => {
    setIsAnimating(true);
    dispatch({ type: appActions.SET_SIDEMENU, payload: !sideMenu });
  };

  const onTransitionEnd = () => {
    setIsAnimating(false);
  };
  const mergedClassNames = classNames(
    styles.sideMenuItemTitle,
    boldMenus?.includes()
  );

  return (
    <>
      <aside
        className={CN.join(
          styles.sideMenu,
          sideMenu ? styles.open : "",
          isAnimating ? styles.isAnimating : ""
        )}
        onTransitionEnd={onTransitionEnd}
      >
        <div className={styles.sideMenuToggle} onClick={toggleSideMenu}>
          <Icon
            name={"long-arrow-left"}
            className={styles.sideMenuToggleIcon}
          />
        </div>
        <ul className={styles.sideMenuItems}>
          {menuItems.map((menuItem) => (
            <Link
              to={menuItem.to}
              key={menuItem.id}
              className={CN.join(
                styles.sideMenuItem,
                pathname === menuItem.to ? styles.active : ""
              )}
            >
              <div className={CN.join(styles.sideMenuItemIconWrapper)}>
                <span className={styles.sideMenuItemIcon}>
                  {menuItem.icon()}
                </span>
              </div>
              {/* {boldMenus.includes(menuItem.title) ? : ""} */}
              <span
                className={CN.join(
                  styles.sideMenuItemTitle,
                  boldMenus.includes(menuItem.title) && styles.boldMenus
                )}
              >
                {menuItem.title}
              </span>
            </Link>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideMenu;
