import React from "react";
import TextArea from "../../components/TextArea/TextArea";
import styles from "./styles.module.css";

const DescriptivePoll = ({ onChange = (f) => f, value = "" , editable = true }) => {
  console.log(value);
  return (
    <>
      <TextArea 
        editable={editable}
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
