import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router";
import { api } from "../../services/http";
import useFetch from "../../hooks/useFetch";
import Rating from "../../components/Rating/Rating";
import { appRoutes } from "../../utils/variables";
import SnackBar from "../../components/SnackBar/SnackBar";
import { DNT } from "../../utils/functions";
import styles from "./styles.module.css";
import Button from "../../components/Button/Button";

const RateReport = () => {
  // states
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState(undefined);

  //   functions
  const getFeedBack = async () => {
    const { success, data } = await api.feedback({ id: feedbackId });
    if (success) setFeedback(data);
  };

  const sendFeedback = async (e) => {
    e.preventDefault();
    const params = {
      token,
      rating,
    };
    const { success } = await api.feedback({
      tail: "rate",
      id: feedbackId,
      params,
    });
    if (success) {
      navigate(appRoutes.home);
      SnackBar.show({
        text: "نظر شما با موفقیت ثبت شد.",
        backgroundColor: "var(--green)",
      });
    }
  };

  // hooks
  const navigate = useNavigate();
  const { feedbackId, token } = useParams();
  const { loading: getLoading } = useFetch({
    fn: getFeedBack,
    auto: feedbackId,
  });
  const { loading, makeRequest } = useFetch({
    fn: sendFeedback,
  });

  // renders
  const renderPage = () => {
    if (getLoading) return <Loader />;
    if (feedback)
      return (
        <>
          <section className={styles.feedbackMessageWrapper}>
            <p className={styles.feedbackMessage}>
              شهروند گرامی، درخواست ثبت شده شما در تاریخ{" "}
              {DNT.toJalaliString(feedback.sent)} با کد رهگیری{" "}
              {feedback.trackingNumber} مربوط به گروه موضوعی {feedback.category}{" "}
              پیگیری و رسیدگی شد.{" "}
            </p>
            <p className={styles.feedbackMessage}>
              لطفا میزان رضایتمندی خود را از فرآیند رسیدگی اعلام نمایید.
            </p>
            <p className={styles.feedbackMessage}>
              نظرات شما باعث ارتقای سطح خدمت رسانی ما خواهد شد.
            </p>
          </section>

          <Rating onChange={setRating} />

          <div className={styles.feedbackButtonWrapper}>
            <Button onClick={makeRequest} loading={loading}>
              ارسال
            </Button>
          </div>
        </>
      );
  };
  return <>{renderPage()}</>;
};

export default RateReport;
