import React from "react";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import useMe from "../../hooks/useMe";
import styles from "./styles.module.css";

const Password = () => {
  // store

  // refs

  // states

  // functions

  // variables

  // hooks
  const {
    passwordValues,
    loading,
    changeUserPassword,
    handlePasswordDataChange,
  } = useMe();

  // renders
  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.fields}>
          <TextInput
            type="password"
            name="oldPassword"
            value={passwordValues.oldPassword}
            onChange={handlePasswordDataChange}
            label="رمز عبور فعلی"
            floatingLabel
          />
          <TextInput
            type="password"
            name="newPassword"
            value={passwordValues.newPassword}
            onChange={handlePasswordDataChange}
            label="رمز عبور جدید"
            floatingLabel
          />
          <TextInput
            type="password"
            name="confirmPassword"
            value={passwordValues.confirmPassword}
            onChange={handlePasswordDataChange}
            label="تکرار رمز عبور جدید"
            floatingLabel
          />
        </div>

        <Button
          className={styles.saveButton}
          onClick={changeUserPassword}
          loading={loading}
        >
          ذخیره
        </Button>
      </section>
    </>
  );
};

export default Password;
