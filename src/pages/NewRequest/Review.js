import React, { useEffect } from "react";
import Button from "../../components/Button/Button";
import { DNT } from "../../utils/functions";
import Toggle from "../../components/Toggle/Toggle";
import styles from "./styles.module.css";

const Review = ({
  values = {},
  loading,
  onSubmit = (f) => f,
  onChange = (f) => f,
}) => {
  console.log(values);
  localStorage.setItem("val", JSON.stringify(values.detail));
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("val")));
  }, []);
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
            <div className=" flex flex-col gap-2">
              {Object.keys(values.detail).map((key, item) => {
                console.log(Array.isArray(values.detail[key]));
                if (typeof values.detail[key] == "string") {
                  return (
                    <div className="">
                      {key}:{values.detail[key]}
                    </div>
                  );
                } else if (
                  typeof values.detail[key] == "object" &&
                  !Array.isArray(values.detail[key])
                ) {
                  return (
                    <div>
                      {key}:{values.detail[key].title}
                    </div>
                  );
                } else if (Array.isArray(values.detail[key])) {
                  return (
                    <div>
                      <div>{key}:</div>
                      <div className=" flex flex-col gap-1">
                        {values.detail[key].map((item) => {
                          if (item.name) {
                            return <div>{item.name}</div>;
                          } else {
                            return <div>{item.title}</div>;
                          }
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
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
        <Toggle onChange={onChange} name="isIdentityVisible" />
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
