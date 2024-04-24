import React, { useState } from "react";
import styles from "./styles.module.css";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import useValidation from "../../hooks/useValidation";
import { validationTypes } from "../../utils/variables";
import { CN } from "../../utils/functions";

const Details = ({
  goToNextStep = (f) => f,
  onChange = (f) => f,
  value,
  name = "",
}) => {
  // states
  const checkField = Object.values(name).includes("firstName");
  console.log(checkField);
  const [comments, setComments] = useState(value);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    comments: value,
  });
  const { validate, validateOne, errors } = useValidation();
  // functions
  const handleChange = (value) => {
    console.log(name);
    onChange(value, name.comments);
    setDetails((prev) => {
      return { ...prev, comments: value };
    });
  };
  const handelFirstName = (value) => {
    onChange(value, name.firstName);
    setDetails((prev) => {
      return { ...prev, firstName: value };
    });
  };
  const handelLastName = (value) => {
    onChange(value, name.laststName);
    setDetails((prev) => {
      return { ...prev, lastName: value };
    });
  };
  const handelNationalId = (value) => {
    onChange(value, name.nationalId);
    setDetails((prev) => {
      return { ...prev, nationalId: value };
    });
  };
  const handelNextStep = () => {
    const validators = [
      {
        name: validationTypes.required,
        payload: { firstName: details.firstName },
      },
      {
        name: validationTypes.required,
        payload: { lastName: details.lastName },
      },
      {
        name: validationTypes.nationalId,
        payload: { nationalId: details.nationalId },
      },
    ];
    if (!validate(validators)) return;
    else goToNextStep();
  };
  return (
    <>
      <section className={styles.details}>
        {checkField && (
          <div className="flex items-center w-full gap-3 px-1">
            <p className=" font-bold">مشخصات شاکی</p>
            <div className=" flex-1 h-[3px] bg-gray-300"></div>
          </div>
        )}
        <div
          className={CN.join(styles.inputWrapper, " mb-5")}
          style={{ display: "flex" }}
        >
          {checkField && (
            <>
              <>
                <TextInput
                  type="string"
                  name="firstName"
                  value={details.firstName}
                  onChange={handelFirstName}
                  label={
                    <p>
                      <span style={{ color: "var(--red)" }}>* </span>نام
                    </p>
                  }
                  error={errors.firstName}
                />
                <TextInput
                  type="string"
                  name="lastName"
                  value={details.lastName}
                  onChange={handelLastName}
                  label={
                    <p>
                      <span style={{ color: "var(--red)" }}>* </span>نام
                      خانوادگی
                    </p>
                  }
                  error={errors.lastName}
                />
                <TextInput
                  type="string"
                  name="nationalId"
                  value={details.nationalId}
                  onChange={handelNationalId}
                  label={
                    <p>
                      <span style={{ color: "var(--red)" }}>* </span>کدملی
                    </p>
                  }
                  error={errors.nationalId}
                />
              </>
            </>
          )}
        </div>
        {checkField && (
          <div className="flex items-center w-full gap-3 px-1 mb-5">
            <p className=" font-bold">متن شکایت</p>
            <div className=" flex-1 h-[3px] bg-gray-300"></div>
          </div>
        )}
        <TextArea
          placeholder={checkField ? "متن شکایت" : "توضیحات"}
          classNames={{
            wrapper: styles.commentsWrapper,
            input: styles.commentsInput,
          }}
          value={details.comments}
          onChange={handleChange}
        />
        <Button
          className={styles.detailsButton}
          onClick={() => {
            if (checkField) {
              handelNextStep();
            } else {
              // handleChange();
              goToNextStep();
            }
          }}
        >
          ادامه
        </Button>
      </section>
    </>
  );
};

export default Details;
