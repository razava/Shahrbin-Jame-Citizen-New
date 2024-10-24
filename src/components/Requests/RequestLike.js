import React, { useState } from "react";
import Icon from "../Icon/Icon";
import styles from "./styles.module.css";
import { api } from "../../services/http";
import { httpMethods } from "../../utils/variables";

const RequestLike = ({ request = {} }) => {
  // states
  const [isLiked, setIsLiked] = useState(request.isLiked);
  const [likes, setLikes] = useState(request.likes);

  //   functions
  const onLike = async (isLiked) => {
    setIsLiked(isLiked);
    const params = {
      reportId: request.id,
      isLiked,
    };
    try {
      const { success, data } = await api.CitizenReport({
        tail: "like",
        id: params.reportId,
        method: httpMethods.put,
      });
      if (success) {
        setLikes(data);
      } else {
        setIsLiked(!isLiked);
      }
    } catch (err) {
      setIsLiked(!isLiked);
    }
  };
  return (
    <>
      <span className={styles.RequestCardLikeAction}>
        {isLiked ? (
          <Icon
            name="heart"
            type="fas"
            color="var(--red)"
            className={styles.RequestCardActionIcon}
            onClick={() => onLike(!isLiked)}
          />
        ) : (
          <Icon
            name="heart"
            type="far"
            className={styles.RequestCardActionIcon}
            onClick={() => onLike(!isLiked)}
          />
        )}
        <span>{likes}</span>
      </span>
    </>
  );
};

export default RequestLike;
