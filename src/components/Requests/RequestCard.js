import React, { useContext } from "react";
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
import { AppStore } from "../../store/AppContext";

const RequestCard = ({ request, isSelfRequest = false }) => {
  // variables
  const thumbnail =
    request?.medias?.length > 0
      ? URI.createMediaUri(request.medias[0].url3)
      : noThumbnail;
  const [store] = useContext(AppStore);
  const categories = store.initialData.categories || {};
  console.log(categories);
  // const categoryTitle = categories.find((item) => item.id == request.categoryId)
  // console.log(categoryTitle);
  console.log(request);
  let categoryTitle;
  categories.categories.map((item) => {
    if (item.id == request.categoryId) {
      categoryTitle = item.title;
      return item;
    } else {
      const a = item.categories.map((itm) => {
        if (itm.id == request.categoryId) {
          categoryTitle = itm.title;
        }
      });
    }
  });
  console.log(request);
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
              {/* {request.category.title} */}
              {categoryTitle}
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
            <RequestProcessIcon
              request={request}
              logs={request.transitionLogs}
            />
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
