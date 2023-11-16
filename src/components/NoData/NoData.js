import React from "react";
import Icon from "../Icon/Icon";
import styles from "./styles.module.css";

const NoData = ({
  message = "اطلاعاتی برای نمایش وجود ندارد.",
  icon = "info-circle",
}) => {
  return (
    <>
      <div className={styles.noData}>
        <Icon name={icon} className={styles.noDataIcon} />
        <p className={styles.noDataMessage}>{message}</p>
      </div>
    </>
  );
};

export default NoData;
