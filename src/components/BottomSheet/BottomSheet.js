import React, { useContext, useEffect, useRef, useState } from "react";
import useClick from "../../hooks/useClick";
import { AppStore } from "../../store/AppContext";
import { CN } from "../../utils/functions";
import { appActions } from "../../utils/variables";
import Icon from "../Icon/Icon";
import styles from "./style.module.css";

const BottomSheet = () => {
  // refrences
  const menuRef = useRef();

  //   store
  const [{ bottomSheet = {} } = {}, dispatch] = useContext(AppStore);

  //   hooks
  const [isMenu, setIsMenu] = useClick({ element: menuRef });

  // states

  // variables

  // functions
  //   close menu
  const closeMenu = () => {
    dispatch({
      type: appActions.SET_BOTTOM_SHEET,
      payload: {
        state: false,
        renderComponent: undefined,
        style: {},
        maxHeight: 0,
      },
    });
  };

  // effects

  //   handle outside clicks
  useEffect(() => {
    if (!isMenu) {
      closeMenu();
    }
  }, [isMenu]);

  useEffect(() => {
    setIsMenu(bottomSheet.state);
  }, [bottomSheet.state]);
  return (
    <>
      <div
        className={CN.join(
          styles.menuWrapper,
          bottomSheet.state ? styles.showMenu : ""
        )}
      >
        <div
          className={[styles.menu].join(" ")}
          ref={menuRef}
          style={{ ...bottomSheet.style }}
        >
          <div className={styles.menuToggle}>
            <Icon
              name="angle-down"
              classNames={{ icon: styles.closeBtn }}
              onClick={closeMenu}
            />
          </div>
          <div
            className={styles.menuContent}
            id="menu"
            style={{
              maxHeight: bottomSheet.maxHeight || "none",
            }}
          >
            {bottomSheet.renderComponent?.()}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
