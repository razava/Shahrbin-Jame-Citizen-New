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
import RequestViolations from "./RequestViolations";
import useBottomSheet from "../../hooks/useBottomSheet";

const RequestComment = ({
  comment,
  onDeleteCommentSuccess = (f) => f,
  request,
}) => {
  //   functions
  const deleteComment = async (e) => {
    e.stopPropagation();
    const { success } = await api.CitizenReport({
      tail: "Comment",
      id: comment.id,
      isPerInstance: false,
      method: httpMethods.delete,
    });
    if (success) {
      onDeleteCommentSuccess();
    }
  };
  console.log(comment.canDelete);

  // hooks
  const { getUserTitle } = useMe();
  const { makeRequest, loading } = useFetch({ fn: deleteComment });
  console.log(URI.createMediaUri(comment.user?.avatar?.url3));
  const { open } = useBottomSheet();

  const style = {
    maxWidth: 700,
    width: "100%",
    minHeight: 75,
  };

  const onIconClick = (e) => {
    e.stopPropagation();
    open({
      style,
      renderComponent: () => (
        <RequestViolations request={request} type="comment" comment={comment} />
      ),
    });
  };

  return (
    <>
      <div className={styles.requestComment}>
        <div className={styles.requestCommentAvatar}>
          <img
            src={
              comment.user?.avatar?.url3
                ? URI.createMediaUri(comment.user?.avatar?.url3)
                : ph
            }
          />
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
            {loading && <DualRingLoader size="small" />}
            {comment.canDelete && (
              <Icon
                type="far"
                name="trash"
                className={styles.requestCommentAction}
                onClick={makeRequest}
              />
            )}
            <Icon
              name="flag"
              type="far"
              className={styles.RequestCardActionIcon}
              onClick={onIconClick}
            />
          </div>
        </div>
      </div>
      {comment?.reply && (
        <div className={styles.requestComment}>
          <div className={styles.requestCommentAvatar}>
            <img
              src={URI.createMediaUri(comment.reply.user?.avatar?.url3) || ph}
            />
          </div>

          <div className={styles.requestCommentDetails}>
            <div className={styles.requestCommentInfo}>
              <p className={styles.requestCommentUserTitle}>
                {getUserTitle(comment.reply.user)}
              </p>
              <span className={styles.requestCommentDate}>
                {DNT.toJalaliString(comment.reply.dateTime)}
              </span>
            </div>
            <div className={styles.requestCommentTextWrapper}>
              <p className={styles.requestCommentText}>{comment.reply.text}</p>
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
      )}
    </>
  );
};

export default RequestComment;
