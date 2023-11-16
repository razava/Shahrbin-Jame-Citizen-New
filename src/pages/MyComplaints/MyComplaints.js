import React from "react";
import styles from "./styles.module.css";
import ComplaintsList from "../../components/Complaints/ComplaintsList";

const MyComplaints = () => {
  // store

  // refs

  // states

  // functions

  // variables

  // hooks

  // renders
  return (
    <>
      <section className={styles.wrapper}>
        <ComplaintsList
          source={{
            controller: "complaint",
            params: {},
            rest: { isPerInstance: false },
          }}
          isSelfComplaint={true}
        />
      </section>
    </>
  );
};

export default MyComplaints;
