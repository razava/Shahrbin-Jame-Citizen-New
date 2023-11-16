import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Icon from "../../components/Icon/Icon";
import styles from "./styles.module.css";

const MenuItem = ({ menuItem, onClick = (f) => f }) => {
  return (
    <>
      <li className={styles.menuListItemLink} onClick={() => onClick(menuItem)}>
        <span className={styles.menuListItemIcon}>{menuItem.icon()}</span>
        <p className={styles.menuListItemTitle}>{menuItem.title}</p>
      </li>
    </>
  );
};

export default MenuItem;
