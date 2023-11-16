import React from "react";
import styles from "./styles.module.css";
import noThumbnail from "../../assets/images/no-image.jpeg";
import { DNT, URI } from "../../utils/functions";
import Icon from "../Icon/Icon";
import { appRoutes, statusColors } from "../../utils/variables";
import RequestLike from "./RequestLike";
import RequestComments from "./RequestComments";
import RequestViolation from "./RequestViolation";
import RequestProcessIcon from "./RequestProcessIcon";
import { useNavigate } from "react-router-dom";
import RequestStatus from "./RequestStatus";

const RequestCard = ({ request, isSelfRequest = false }) => {
  // variables
  const thumbnail =
    request?.medias?.length > 0
      ? URI.createMediaUri(request.medias[0].url3)
      : noThumbnail;

  // hooks
  const navigate = useNavigate();

  // functions
  const goToRequest = () => {
    if (isSelfRequest)
      navigate(appRoutes.request.replace(/:id/, request.id), {
        state: request,
      });
  };
  return (
    <>
      <article
        className={styles.requestCard}
        onClick={goToRequest}
        style={{ cursor: isSelfRequest ? "pointer" : "default" }}
      >
        <div className={styles.requestCardThumbnailWrapper}>
          <img src={thumbnail} />
        </div>
        <div className={styles.requestCardInfoWrapper}>
          <div className={styles.requestCardInfoRow}>
            <p className={styles.requestCardCategory}>
              {request.category.title}
            </p>
            <RequestStatus lastStatus={request.lastStatus} />
          </div>

          <div className={styles.requestCardInfoRow}>
            <div className={styles.RequestCardAddress}>
              <Icon
                name="map-marker-alt"
                className={styles.RequestCardAddressIcon}
              />
              <p>{request?.address?.detail}</p>
            </div>
          </div>

          <div className={styles.requestCardInfoRow}>
            <div className={styles.requestCardTrackingNumber}>
              <span>کد رهگیری: </span>
              <span>{request.trackingNumber}</span>
            </div>
            <div className={styles.requestCardDate}>
              <span>{DNT.toJalaliString(request.sent)}</span>
            </div>
          </div>

          <div className={styles.requestCardInfoRow}>
            <RequestProcessIcon logs={request.transitionLogs} />
            <div className={styles.requestCardActions}>
              <RequestViolation request={request} />
              <RequestLike request={request} />
              <RequestComments request={request} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default RequestCard;
