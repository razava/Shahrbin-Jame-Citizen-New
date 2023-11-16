import React from "react";
import { statusColors } from "../../utils/variables";
import styles from "./styles.module.css";

const RequestStatus = ({ lastStatus }) => {
  return (
    <>
      <span
        className={styles.requestCardStatus}
        style={{ backgroundColor: statusColors[lastStatus] }}
      >
        {lastStatus}
      </span>
    </>
  );
};

export default RequestStatus;
