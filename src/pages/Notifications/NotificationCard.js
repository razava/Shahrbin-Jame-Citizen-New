import React from "react";
import Icon from "../../components/Icon/Icon";
import useBottomSheet from "../../hooks/useBottomSheet";
import { DNT } from "../../utils/functions";
import RequestProcess from "../../components/Requests/RequestProcess";
import styles from "./styles.module.css";

const NotificationCard = ({ message = {} }) => {
  // hooks
  const { open } = useBottomSheet();

  // variables
  const style = {
    maxWidth: 700,
    width: "100%",
  };

  // functions
  const handleClick = (e) => {
    open({
      style,
      renderComponent: () => (
        <RequestProcess requestId={message.subjectId} highlight={message} />
      ),
    });
  };

  return (
    <>
      <article className={styles.notifCard} onClick={handleClick}>
        <div className={styles.notifCardIconWrapper}>
          <Icon name={"envelope"} type="far" className={styles.notifCardIcon} />
        </div>

        <div className={styles.notifCardDetails}>
          <p className={styles.notifCardTitle}>{message.title}</p>
          <div className={styles.notifCardRow}>
            <p className={styles.notifCardContent}>{message.content}</p>
            <p className={styles.notifCardDate}>
              {DNT.toJalaliString(message.dateTime)}
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default NotificationCard;
