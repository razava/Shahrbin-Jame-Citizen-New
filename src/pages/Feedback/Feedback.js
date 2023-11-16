import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/http";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { DNT, DS } from "../../utils/functions";
import Toggle from "../../components/Toggle/Toggle";
import TextArea from "../../components/TextArea/TextArea";
import AddAttahment from "../../components/Attachments/AddAttahment";
import Rating from "../../components/Rating/Rating";
import Button from "../../components/Button/Button";
import { appRoutes, contentTypes, httpMethods } from "../../utils/variables";
import { toast } from "react-toastify";

const Feedback = () => {
  // store

  // refs

  // states
  const [complaint, setComplaint] = useState({});
  const [values, setValues] = useState({
    isObjection: false,
    description: "",
    attachments: [],
    rating: 1,
  });

  // functions
  const getComplaint = async () => {
    const { success, data } = await api.complaint({
      id: complaintId,
      isPerInstance: false,
    });
    if (success) {
      setComplaint(data);
    }
  };

  const hanldeChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    const payload = {
      id: complaintId,
      ...values,
      attachments: values.attachments.map(a => a.file)
    };
    const headers = {
      "Content-Type": contentTypes.formData,
    };
    const { success } = await api.complaint({
      tail: "Feedback",
      payload: DS.toFormData(payload),
      method: httpMethods.post,
      isPerInstance: false,
      headers,
    });
    if (success) {
      toast("بازخورد شما ثبت شد.", { type: "success" });
      navigate(appRoutes.myComplaints);
    }
  };

  // variables

  // hooks
  const { id: complaintId } = useParams();
  const { loading } = useFetch({ fn: getComplaint, auto: true });
  const { loading: submitLoading, makeRequest } = useFetch({ fn: submit });
  const navigate = useNavigate();

  // renders
  return (
    <>
      <section className={styles.wrapper}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <p>
              شهروند گرامی، شکایت شما با کد رهگیری{" "}
              <span className={styles.trackingNumber}>
                {complaint.trackingNumber}
              </span>{" "}
              و دسته بندی{" "}
              <span className={styles.category}>
                {complaint.category?.title}
              </span>{" "}
              ثبت شده در تاریخ{" "}
              <span className={styles.date}>
                {DNT.toJalaliString(complaint.created)}
              </span>{" "}
              به پایان رسید. آیا صحت بررسی شکایت خود را تایید می‌نمایید؟
            </p>

            <p className={styles.warning}>
              توجه: در صورت عدم تایید صحت، شکایت شما به واحد بازرسی استان ارجاع
              داده شده و بررسی نهایی اعمال می‌گردد.
            </p>

            <div className={styles.form}>
              <div className={styles.confirmation}>
                <p>صحت بررسی شکایت را تایید می‌نمایم.</p>
                <Toggle
                  defaultState={true}
                  onChange={(value, name) => hanldeChange(!value, name)}
                  name="isObjection"
                />
              </div>

              <Rating name="rating" onChange={hanldeChange} />

              {values.isObjection && (
                <div className={styles.objection}>
                  <TextArea
                    placeholder="توضیحات"
                    name="description"
                    value={values.description}
                    onChange={hanldeChange}
                  />

                  <AddAttahment name="attachments" onChange={hanldeChange} />
                </div>
              )}
            </div>

            <Button
              className={styles.btn}
              loading={submitLoading}
              onClick={makeRequest}
            >
              ثبت
            </Button>
          </>
        )}
      </section>
    </>
  );
};

export default Feedback;
