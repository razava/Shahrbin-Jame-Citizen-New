import React, { useEffect, useState } from "react";
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
import RadioGroup from "../../components2/Radio/RadioGroup";
import TextInput from "../../components2/TextInput/TextInput";
import DropZone from "../../components2/FileDrop/DropZone";
import { postFeedback, postObjection } from "../../services/CitizenReport";
import { useMutation } from "@tanstack/react-query";

const Feedback = () => {
  // store

  // refs

  // states
  const [complaint, setComplaint] = useState({});
  const [satisfaction, setSatisfaction] = useState();
  const [values, setValues] = useState({
    comments: "",
    attachments: [],
    rating: 1,
  });

  // functions
  const getComplaint = async () => {
    const { success, data } = await api.CitizenReport({
      tail: "Mine",
      id: complaintId,
      isPerInstance: true,
    });
    if (success) {
      setComplaint(data);
    }
  };

  const hanldeChange = (e, name) => {
    console.log(e);
    setValues({ ...values, [name]: e });
  };

  const handleRadioChange = (e, name) => {
    console.log(e.value);
    setSatisfaction(e.value);
  };

  const submit = async () => {
    console.log(values.attachments);
    const payload = {
      id: complaintId,
      ...values,
      attachments: values.attachments.map((a) => a.id),
    };
    const headers = {
      "Content-Type": contentTypes.formData,
    };
    const { success } = await api.CitizenReport({
      tail: "Feedback",
      payload: DS.toFormData(payload),
      method: httpMethods.post,
      isPerInstance: false,
      headers,
    });
    if (success) {
      toast("بازخورد شما ثبت شد.", { type: "success" });
      navigate(appRoutes.myRequests);
    }
  };

  const postFeedbackMutation = useMutation({
    mutationKey: ["postFeedback"],
    mutationFn: postFeedback,
    onSuccess: (res) => {
      // if (satisfaction !== 0) {
      toast("بازخورد شما ثبت شد.", { type: "success" });
      navigate(appRoutes.myRequests);
      // }
    },
    onError: (err) => {},
  });

  const postObjectionMutation = useMutation({
    mutationKey: ["postObjection"],
    mutationFn: postObjection,
    onSuccess: (res) => {
      toast("بازخورد شما ثبت شد.", { type: "success" });
      navigate(appRoutes.myRequests);
    },
    onError: (err) => {},
  });
  // variables

  // hooks
  const { id: complaintId } = useParams();
  const { loading } = useFetch({ fn: getComplaint, auto: true });
  const { loading: submitLoading, makeRequest } = useFetch({ fn: submit });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handelSubmit = () => {
    if (satisfaction == 1) {
      postObjectionMutation.mutate({
        id: complaintId,
        payload: {
          attachments: values.attachments.map((item) => item.id),
          comments: values.comments,
        },
      });
    } else {
      postFeedbackMutation.mutate({
        payload: { rating: values.rating },
        id: complaintId,
      });
    }
  };

  // renders
  return (
    <>
      <section className={styles.wrapper}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <p>
              شهروند گرامی، درخواست شما با کد رهگیری{" "}
              <span className={styles.trackingNumber}>
                {complaint.trackingNumber}
              </span>{" "}
              و مربوط به گروه موضوعی{" "}
              <span className={styles.category}>{complaint.categoryTitle}</span>{" "}
              ثبت شده در تاریخ{" "}
              <span className={styles.date}>
                {DNT.toJalaliString(complaint.sent)}
              </span>{" "}
              پیگیری و رسیدگی شد.
              {/* آیا صحت بررسی شکایت خود را تایید می‌نمایید */}
            </p>

            <p className=" text-right w-full">
              لطفا میزان رضایتمندی خود را از فرآیند رسیدگی اعلام نمایید.
            </p>
            <p className=" text-right w-full">
              نظرات شما باعث ارتقای سطح خدمت رسانی ما خواهد شد.
            </p>
            {/* <p className={styles.warning}>
              توجه: در صورت عدم تایید صحت، شکایت شما به واحد بازرسی استان ارجاع
              داده شده و بررسی نهایی اعمال می‌گردد.
            </p> */}
            <div className={styles.form}>
              {/* <div className={styles.confirmation}>
                <p>صحت بررسی شکایت را تایید می‌نمایم.</p>
                <Toggle
                defaultState={true}
                onChange={(value, name) => hanldeChange(!value, name)}
                name="isObjection"
                />
              </div> */}
              {satisfaction !== 1 && (
                <Rating name="rating" onChange={hanldeChange} />
              )}
              <p>آیا از نحوه ی پاسخگویی راضی بودید؟</p>
              <div className=" mb-5">
                <RadioGroup
                  options={[
                    { value: 0, title: "بله" },
                    { value: 1, title: "خیر" },
                  ]}
                  onChange={(value) => handleRadioChange(value, "")}
                  // {...meta.props}
                />
              </div>
              {satisfaction == 1 && (
                <>
                  <TextInput
                    name={"comments"}
                    onChange={hanldeChange}
                    label="توضیحات"
                  />
                  <DropZone
                    onChange={(value) => hanldeChange(value, "attachments")}
                    label="پیوست‌ها"
                  />
                </>
              )}

              {/* {satisfaction == 0 && (
                <div className={styles.objection}>
                  <TextArea
                    placeholder="توضیحات"
                    name="description"
                    value={values.description}
                    onChange={hanldeChange}
                  />

                  <AddAttahment name="attachments" onChange={hanldeChange} />
                </div>
              )} */}
            </div>

            <Button
              className={styles.btn}
              loading={submitLoading}
              onClick={handelSubmit}
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
