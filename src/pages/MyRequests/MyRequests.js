import React from "react";
import RequestList from "../RecentRequests/RequestList";
import styles from "./styles.module.css";

const MyRequests = () => {
  return (
    <>
      <section className={styles.wrapper}>
        <RequestList
          source={{ controller: "report", params: {} }}
          isSelfRequest={true}
        />
      </section>
    </>
  );
};

export default MyRequests;
