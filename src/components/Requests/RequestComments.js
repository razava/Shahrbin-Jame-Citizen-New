import React, { useState } from "react";
import useBottomSheet from "../../hooks/useBottomSheet";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import { httpMethods } from "../../utils/variables";
import Icon from "../Icon/Icon";
import DualRingLoader from "../Loader/DualRingLoader";
import Loader from "../Loader/Loader";
import RequestComment from "./RequestComment";
import styles from "./styles.module.css";

const RequestComments = ({ request = {} }) => {
  const [commentsCount, setCommentsCount] = useState(
    request.commentsCount ? request.commentsCount : 0
  );

  //   hooks
  const { open } = useBottomSheet();

  //   variables
  const style = {
    maxWidth: 700,
    width: "100%",
    minHeight: 75,
  };

  //   functions
  const onIconClick = (e) => {
    e.stopPropagation();
    open({
      renderComponent: () => (
        <Comments
          refresh={() =>
            setCommentsCount((prev) => {
              return prev + 1;
            })
          }
          request={request}
        />
      ),
      style,
    });
  };
  console.log(request);
  return (
    <>
      <span onClick={onIconClick} className={styles.RequestCardCommentAction}>
        <Icon
          name="comment"
          type="far"
          className={styles.RequestCardActionIcon}
        />
        <span>{commentsCount}</span>
      </span>
    </>
  );
};

export default RequestComments;

const Comments = ({ request = {}, refresh }) => {
  //   states
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentInputHeight, setCommentInputHeight] = useState(20);

  //   functions
  const getComments = async () => {
    const { success, data } = await api.CitizenReport({
      tail: "Comments",
      id: request.id,
      isPerInstance: false,
    });
    if (success) {
      setComments(data);
    }
  };

  const addComment = async (e) => {
    if (commentText.trim() === "") return;
    e.stopPropagation();
    // const payload = {
    //   // reportId: request.id,
    //   comment: commentText,
    //   // isSeen: true,
    //   isVerified: true,
    // };
    const payload = { comment: commentText };
    const { success } = await api.CitizenReport({
      tail: "Comment",
      id: request.id,
      payload,
      method: httpMethods.post,
    });
    if (success) {
      setCommentText("");
      getComments();
      refresh();
    }
  };

  const handleCommentInputChange = (e) => {
    const value = e.target.value;
    const isDeleting = value.length < commentText.length;
    const rows = Math.floor(value.length / e.target.cols + 1);
    const height = isDeleting ? rows * 20 : e.target.scrollHeight;
    setCommentText(value);
    setCommentInputHeight(height);
  };

  //   hooks
  const { loading } = useFetch({
    fn: getComments,
    // auto: request.commentsCount > 0,
    auto: true,
  });
  const { makeRequest, loading: addLoading } = useFetch({
    fn: addComment,
  });

  // renders
  const renderComments = () => {
    if (comments.length === 0 && request.commentsCount === 0)
      return (
        <p className={styles.RequestCardNoCommentsText}>
          هنوز نظری برای این درخواست ثبت نشده است.
        </p>
      );
    else if (loading) return <Loader />;
    else
      return comments.map((comment) => (
        <RequestComment
          request={request}
          comment={comment}
          onDeleteCommentSuccess={getComments}
        />
      ));
  };

  const renderAddComment = () => {
    return (
      <div className={styles.requestAddComment}>
        <div className={styles.requestAddCommentIconWrapper}>
          {addLoading ? (
            <DualRingLoader size="small" />
          ) : (
            <Icon
              name="paper-plane"
              className={styles.requestAddCommentIcon}
              onClick={makeRequest}
            />
          )}
        </div>
        <textarea
          className={styles.requestAddCommentInput}
          value={commentText}
          onChange={handleCommentInputChange}
          placeholder="نظر جدید..."
          style={{
            height: commentInputHeight,
          }}
        />
      </div>
    );
  };
  return (
    <>
      <section className={styles.requestComments}>{renderComments()}</section>
      {renderAddComment()}
    </>
  );
};
