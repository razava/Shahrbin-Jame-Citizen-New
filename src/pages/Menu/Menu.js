import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Staggered from "../../components/Animated/Staggered";
import { menuItems } from "./constants";
import MenuItem from "./MenuItem";
import styles from "./styles.module.css";

const Menu = () => {
  //   states
  const [currentItem, setCurrentItem] = useState();

  //   hooks
  const { startNavigation } = useOutletContext();

  //   functions
  const onMenuItemClicked = (menuItem) => {
    setCurrentItem(menuItem);
  };

  const onAnimationEnd = () => {
    if (currentItem) {
      startNavigation(currentItem);
    }
    // setCurrentItem(undefined);
  };
  return (
    <>
      <ul className={styles.menuList}>
        <Staggered
          className={styles.menuListItem}
          reverse={!!currentItem}
          onAnimationEnd={onAnimationEnd}
        >
          {menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              menuItem={menuItem}
              onClick={onMenuItemClicked}
            />
          ))}
        </Staggered>
      </ul>
    </>
  );
};

export default Menu;
