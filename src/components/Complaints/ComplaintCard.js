import React from "react";
import styles from "./styles.module.css";
import { DNT } from "../../utils/functions";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";
import { appRoutes } from "../../utils/variables";
import RequestStatus from "../Requests/RequestStatus";
import RequestProcessIcon from "../Requests/RequestProcessIcon";
import { useQuery } from "@tanstack/react-query";
import { getComplaintHistory } from "../../services/Api";

const ComplaintCard = ({ complaint = {}, isSelfComplaint = false }) => {
  // functions
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "ایجاد شده";
      case 1:
        return "در حال بررسی";
      case 2:
        return "پایان یافته";
      case 3:
        return "اعتراض شهروند";
      default:
        return "در حال بررسی";
    }
  };

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["Captcha"],
    queryFn: () => getComplaintHistory(complaint.id),
  });

  console.log(data);
  // status
  // 0: created
  // 1: live
  // 2: finished
  // 3: objection

  return (
    <>
      <article
        className={styles.complaintCard}
        // onClick={goToRequest}
        style={{ cursor: isSelfComplaint ? "pointer" : "default" }}
      >
        <div className={styles.complaintCardInfoWrapper}>
          <div className={styles.complaintCardInfoRow}>
            <p className={styles.complaintCardCategory}>
              {complaint.categoryTitle}
            </p>
            <RequestStatus lastStatus={getStatusText(complaint.status)} />
          </div>

          <div className={styles.complaintCardInfoRow}>
            <div className={styles.complaintCardTrackingNumber}>
              <span>کد رهگیری: </span>
              <span>{complaint.trackingNumber}</span>
            </div>
            <div className={styles.complaintCardDate}>
              <span>{DNT.toJalaliString(complaint.created)}</span>
            </div>
          </div>

          <div className={styles.complaintCardInfoRow}>
            {complaint?.currentUnit && (
              <div className={styles.complaintCardAddress}>
                <Icon
                  name="building"
                  className={styles.complaintCardAddressIcon}
                />
                <p>{complaint?.currentUnit?.title}</p>
              </div>
            )}
          </div>

          <div className={styles.complaintCardInfoRow}>
            {data && (
              <RequestProcessIcon
                request={complaint.id}
                logs={data}
                keys={{
                  name: "title",
                  date: "timestamp",
                  attachments: "medias",
                }}
              />
            )}
            <div className={styles.complaintCardActions}>
              {complaint.status === 2 && complaint.rating === null && (
                <Link
                  to={appRoutes.feedback.replace(/:id/, complaint.id)}
                  className={styles.complaintCardAction}
                >
                  <Icon
                    name={"star"}
                    className={styles.complaintCardActionIcon}
                  />
                  <span>بازخورد</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default ComplaintCard;
