import React from "react";
import insta from "../../assets/images/insta-B.png";
import whats from "../../assets/images/whats-B.png";
import tel from "../../assets/images/tel-B.png";
import web from "../../assets/images/web-B.png";
import styles from "./styles.module.css";
import Staggered from "../../components/Animated/Staggered";

const SocialMedia = () => {
  return (
    <>
      <div className={styles.socialMedia}>
        <Staggered>
          <a
            target={"_blank"}
            href={"https://instagram.com/shahrbin_app?utm_medium=copy_link"}
          >
            <img src={insta} />
          </a>
          <a
            target={"_blank"}
            href={"https://api.whatsapp.com/send?phone=989055685243"}
          >
            <img src={whats} />
          </a>
          <a target={"_blank"} href={"https://t.me/shahrbin"}>
            <img src={tel} />
          </a>
          <a target={"_blank"} href={"https://shahrbinapp.com"}>
            <img src={web} />
          </a>
        </Staggered>
      </div>
    </>
  );
};

export default SocialMedia;
