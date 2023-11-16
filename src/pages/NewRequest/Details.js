import React, { useState } from "react";
import styles from "./styles.module.css";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";

const Details = ({ goToNextStep = (f) => f, onChange = (f) => f, value, name="" }) => {
  // states
  const [comments, setComments] = useState(value);

  // functions
  const handleChange = (value) => {
    onChange(value, name);
    setComments(value);
  };
  return (
    <>
      <section className={styles.details}>
        <TextArea
          placeholder="توضیحات"
          classNames={{
            wrapper: styles.commentsWrapper,
            input: styles.commentsInput,
          }}
          value={comments}
          onChange={handleChange}
        />

        <Button className={styles.detailsButton} onClick={goToNextStep}>
          ادامه
        </Button>
      </section>
    </>
  );
};

export default Details;
