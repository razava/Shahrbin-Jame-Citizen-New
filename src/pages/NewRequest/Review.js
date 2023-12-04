import React from "react";
import Button from "../../components/Button/Button";
import { DNT } from "../../utils/functions";
import Toggle from "../../components/Toggle/Toggle";
import styles from "./styles.module.css";

const Review = ({ values = {}, loading, onSubmit = (f) => f }) => {
  console.log(values);
  return (
    <>
      <section className={styles.review}>
        <ul className={styles.reviewBox}>
          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>دسته‌بندی: </span>
            <span className={styles.reviewItemValue}>
              {values?.category?.title}
            </span>
          </li>

          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>آدرس: </span>
            <span className={styles.reviewItemValue}>
              {values?.address?.details}
            </span>
          </li>

          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>جزئیات: </span>
            <span className={styles.reviewItemValue}>
              {String(values.comments).length > 50
                ? String(values.comments).slice(0, 50) + "..."
                : values.comments}
            </span>
          </li>

          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>پیوست‌ها: </span>
            <span className={styles.reviewItemValue}>
              {values.attachments.length || "بدون پیوست"}
            </span>
          </li>
        </ul>

        <ul className={styles.reviewBox}>
          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>زمان پاسخگویی: </span>
            <span className={styles.reviewItemValue}>
              {DNT.hoursToDays(values?.category?.responseDuration)} روز
            </span>
          </li>

          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>زمان اتمام: </span>
            <span className={styles.reviewItemValue}>
              {DNT.hoursToDays(values?.category?.duration)} روز
            </span>
          </li>
        </ul>
      </section>

      <div className={styles.identityVisibility}>
        <p>اطلاعات هویتی من را نمایش بده.</p>
        <Toggle />
      </div>
      <Button
        className={styles.stepButton}
        loading={loading}
        onClick={onSubmit}
      >
        ایجاد درخواست
      </Button>
    </>
  );
};

export default Review;
