import React from "react";
import useMe from "../../hooks/useMe";
import styles from "./styles.module.css";
import TextInput from "../../components/TextInput/TextInput";
import Avatar from "../../components/Avatar/Avatar";
import DropDown from "../../components/DropDown/DropDown";
import { educations, genders } from "./constants";
import DatePicker from "../../components/DatePicker/DatePicker";
import Button from "../../components/Button/Button";

const Profile = () => {
  //   hooks
  const { values, loading, handleUserDataChange, updateUserData } = useMe();

  return (
    <>
      <section className={styles.wrapper}>
        <Avatar
          source={values.avatarFile}
          name="avatarFile"
          editable
          onChange={handleUserDataChange}
        />

        <div className={styles.profileFields}>
          <TextInput
            label="نام"
            floatingLabel
            name="firstName"
            onChange={handleUserDataChange}
            classNames={{
              wrapper: styles.profileFieldWrapper,
            }}
            value={values.firstName}
          />
          <TextInput
            label="نام خانوادگی"
            floatingLabel
            name="lastName"
            onChange={handleUserDataChange}
            classNames={{
              wrapper: styles.profileFieldWrapper,
            }}
            value={values.lastName}
          />
          <DropDown
            options={genders}
            name={"gender"}
            label="جنسیت"
            position={"bottom"}
            onChange={(value, name) => handleUserDataChange(value.value, name)}
            defaultSelecteds={[{ value: values.gender }]}
            required
            inDialog
          />
          <DropDown
            options={educations}
            name={"educationId"}
            label="تحصیلات"
            position={"bottom"}
            onChange={(value, name) => handleUserDataChange(value.value, name)}
            defaultSelecteds={[{ value: values.educationId }]}
            required
            inDialog
          />
          <DatePicker
            name={"birthDate"}
            label="تاریخ تولد"
            value={values.birthDate}
            onChange={handleUserDataChange}
            isInDialog
          />
          <TextInput
            label="شماره ثابت"
            floatingLabel
            name="phoneNumber2"
            onChange={handleUserDataChange}
            digitsOnly
            classNames={{
              wrapper: styles.profileFieldWrapper,
            }}
            value={values.phoneNumber2}
          />
          <TextInput
            label="آدرس"
            floatingLabel
            name="address.detail"
            onChange={handleUserDataChange}
            classNames={{
              wrapper: styles.profileFieldWrapper,
            }}
            value={values["address.detail"]}
          />
          <TextInput
            label="کد ملی"
            floatingLabel
            name="nationalId"
            onChange={handleUserDataChange}
            classNames={{
              wrapper: styles.profileFieldWrapper,
            }}
            value={values.nationalId}
          />
        </div>

        <Button
          className={styles.profileSaveButton}
          loading={loading}
          onClick={updateUserData}
        >
          ذخیره
        </Button>
      </section>
    </>
  );
};

export default Profile;
