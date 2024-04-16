import React, { useContext, useState } from "react";
import { AppStore } from "../../store/AppContext";
import { CN, LS } from "../../utils/functions";
import styles from "./styles.module.css";
import TextArea from "../TextArea/TextArea";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { api } from "../../services/http";
import { httpMethods } from "../../utils/variables";
import useFetch from "../../hooks/useFetch";

const RequestViolations = ({
  request = {},
  comment = {},
  type = "request",
}) => {
  //   store
  const [store = {}, dispatch] = useContext(AppStore);
  const { initialData: { violationTypes = [] } = {} } = store;

  // states
  const [currentStep, setCurrentStep] = useState(1);
  const [violationType, setViolationType] = useState("");
  const [violationDescription, setViolationDescription] = useState("");

  // functions
  const onSelectType = (vT) => (e) => {
    e.stopPropagation();
    setViolationType(vT);
    setCurrentStep((prev) => prev + 1);
  };

  const submitViolation = async () => {
    const payload = {
      description: violationDescription,
      violationTypeId: violationType.id,
    };
    if (type == "request") {
      payload.reportId = request.id;
    } else {
      payload.commentId = comment.id;
    }
    const instance = LS.read(appConstants.SH_CT_INSTANCE);
    const { success } = await api.CitizenReport({
      payload: payload,
      method: httpMethods.post,
      isPerInstance: false,
      tail: type == "request" ? "ReportViolation" : "CommentViolation",
      id:
        type == "request"
          ? `${request.id}/${instance.id}`
          : `${comment.id}/${instance.id}`,
    });
    if (success) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // hooks
  const { makeRequest, loading } = useFetch({ fn: submitViolation });

  // renders
  const renderStep = () => {
    if (currentStep === 1)
      return (
        <>
          <ul className={styles.violationTypes}>
            {violationTypes.map((vT) => (
              <li
                className={CN.join(
                  styles.violationType,
                  vT.id === violationType.id ? styles.selected : ""
                )}
                onClick={onSelectType(vT)}
              >
                {vT.title}
              </li>
            ))}
          </ul>
        </>
      );
    else if (currentStep === 2)
      return (
        <div className={styles.violationDetails}>
          <Button
            stopPropagation
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className={styles.violationBackButton}
          >
            <span>بازگشت</span>
          </Button>
          <TextArea
            placeholder="توضیحات"
            value={violationDescription}
            onChange={(value) => setViolationDescription(value)}
            classNames={{ input: styles.violationComment }}
          />
          <Button
            className={styles.violationSubmitButton}
            onClick={makeRequest}
            loading={loading}
          >
            ارسال
          </Button>
        </div>
      );
    else if (currentStep === 3)
      return (
        <div className={styles.violationSubmitSuccess}>
          <Icon
            name="check-circle"
            className={CN.join(styles.violationSubmitSuccessIcon, "bounce")}
          />
          <p>
            شهروند گرامی، گزارش تخلف شما ثبت شد و در اسرع وقت بررسی می‌گردد.
          </p>
        </div>
      );
  };
  return (
    <>
      <section className={styles.violationWrapper}>{renderStep()}</section>
    </>
  );
};

export default RequestViolations;
