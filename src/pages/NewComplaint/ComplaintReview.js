import React from "react";
import Button from "../../components/Button/Button";
import { DNT } from "../../utils/functions";
import Toggle from "../../components/Toggle/Toggle";
import styles from "./styles.module.css";

const ComplaintReview = ({ values = {}, loading, onSubmit = (f) => f }) => {
  return (
    <>
      <section className={styles.review}>
        <ul className={styles.reviewBox}>
          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>شهر: </span>
            <span className={styles.reviewItemValue}>{values?.city?.name}</span>
          </li>

          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>دسته‌بندی: </span>
            <span className={styles.reviewItemValue}>
              {values?.category?.title}
            </span>
          </li>

          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>نام و نام‌خانوادگی: </span>
            <span className={styles.reviewItemValue}>
              {values?.firstName} {values?.laststName}
            </span>
          </li>

          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>کدملی: </span>
            <span className={styles.reviewItemValue}>
              {values?.nationalId}
            </span>
          </li>

          <li className={styles.reviewItem}>
            {console.log(values)}
            <span className={styles.reviewItemTitle}>جزئیات: </span>
            <span className={styles.reviewItemValue}>
              {String(values.comments).length > 50
                ? String(values.comments).slice(0, 50) + "..."
                : values.comments}
              {/* {values?.description} */}
            </span>
          </li>

          <li className={styles.reviewItem}>
            <span className={styles.reviewItemTitle}>پیوست‌ها: </span>
            <span className={styles.reviewItemValue}>
              {values.attachments.length || "بدون پیوست"}
            </span>
          </li>
        </ul>
      </section>

      <Button
        className={styles.stepButton}
        loading={loading}
        onClick={onSubmit}
      >
        ثبت شکایت
      </Button>
    </>
  );
};

export default ComplaintReview;
