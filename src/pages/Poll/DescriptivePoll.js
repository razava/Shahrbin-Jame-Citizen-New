import React from "react";
import TextArea from "../../components/TextArea/TextArea";
import styles from "./styles.module.css";

const DescriptivePoll = ({ onChange = (f) => f, value = "" }) => {
  return (
    <>
      <TextArea
        placeholder="نظر خود را اینجا بنویسید..."
        classNames={{
          input: styles.pollInput,
          wrapper: styles.pollInputWrapper,
        }}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default DescriptivePoll;
