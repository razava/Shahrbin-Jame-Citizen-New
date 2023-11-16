import React from "react";
import Icon from "../../components/Icon/Icon";
import styles from "./styles.module.css";

const SettingCard = ({ title = "", icon = "", onClick = (f) => f }) => {
  return (
    <>
      <article className={styles.settingCard} onClick={onClick}>
        <div className={styles.settingCardContent}>
          <Icon name={icon} className={styles.settingCardIcon} />
          <p className={styles.settingCardTitle}>{title}</p>
        </div>

        <Icon name={"angle-left"} className={styles.settingCardIcon} />
      </article>
    </>
  );
};

export default SettingCard;
