import React from "react";
import bazaar from "../../assets/images/bazaar.svg";
import direct from "../../assets/images/direct.png";
import styles from "./styles.module.css";

const ExternalLinks = () => {
  // variables
  const linkStyles = {
    width: "150px",
    height: "auto",
    margin: "0 auto",
  };
  const bazzarLink = process.env.REACT_APP_APPLICATION_BAZAAR_LINK && (
    <a href={process.env.REACT_APP_APPLICATION_BAZAAR_LINK} target="_blank">
      <img src={bazaar} style={linkStyles} />
    </a>
  );
  const directLink = process.env.REACT_APP_APPLICATION_DIRECT_LINK && (
    <a href={process.env.REACT_APP_APPLICATION_DIRECT_LINK} target="_blank">
      <img src={direct} style={linkStyles} />
    </a>
  );
  return (
    <>
      <section className={styles.externalLinksWrapper}>
        <div className={styles.externalLinks}>
          {bazzarLink}
          {directLink}
        </div>
      </section>
    </>
  );
};

export default ExternalLinks;
