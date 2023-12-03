import React from "react";
import styles from "./styles.module.css";
import ph from "../../assets/images/ph.png";
import useMe from "../../hooks/useMe";
import { DNT, URI } from "../../utils/functions";
import Icon from "../Icon/Icon";
import { api } from "../../services/http";
import { httpMethods } from "../../utils/variables";
import useFetch from "../../hooks/useFetch";
import DualRingLoader from "../Loader/DualRingLoader";

const RequestComment = ({ comment, onDeleteCommentSuccess = (f) => f }) => {
  //   functions
  const deleteComment = async (e) => {
    e.stopPropagation();
    const { success } = await api.CitizenReport({
      tail: "Comment",
      id: comment.id,
      method: httpMethods.delete,
    });
    if (success) {
      onDeleteCommentSuccess();
    }
  };

  // hooks
  const { getUserTitle } = useMe();
  const { makeRequest, loading } = useFetch({ fn: deleteComment });
  return (
    <>
      <div className={styles.requestComment}>
        <div className={styles.requestCommentAvatar}>
          <img src={URI.createMediaUri(comment.user?.avatar?.url3) || ph} />
        </div>

        <div className={styles.requestCommentDetails}>
          <div className={styles.requestCommentInfo}>
            <p className={styles.requestCommentUserTitle}>
              {getUserTitle(comment.user)}
            </p>
            <span className={styles.requestCommentDate}>
              {DNT.toJalaliString(comment.dateTime)}
            </span>
          </div>
          <div className={styles.requestCommentTextWrapper}>
            <p className={styles.requestCommentText}>{comment.text}</p>
            {comment.canDelete && loading ? (
              <DualRingLoader size="small" />
            ) : (
              <Icon
                type="far"
                name="trash"
                className={styles.requestCommentAction}
                onClick={makeRequest}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestComment;
