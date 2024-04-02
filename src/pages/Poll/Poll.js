import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import { CN, STR, cn } from "../../utils/functions";
import { appRoutes, httpMethods } from "../../utils/variables";
import DescriptivePoll from "./DescriptivePoll";
import SelectivePoll from "./SelectivePoll";
import styles from "./styles.module.css";

const Poll = () => {
  // states
  const [poll, setPoll] = useState({});
  const [values, setValues] = useState({
    text: "",
    selectedChoices: [],
  });

  // functions
  const getData = async () => {
    const { success, data } = await api.CitizenPolls({ id });
    if (success) {
      setPoll(data);
      console.log(data);
      console.log(data.answer?.choices);
      setValues({
        text: data.answer?.text || "",
        selectedChoices: data.answer?.choices || [],
      });
    }
  };

  useEffect(() => {});
  const submitPoll = async () => {
    const payload = {
      text: values.text,
      choicesIds: values.selectedChoices.map((s) => s.id),
    };
    const { success, data, message } = await api.CitizenPolls({
      tail: "Polls/Answer",
      payload,
      method: httpMethods.post,
      id: poll.id,
    });
    if (success) {
      toast(message, { type: "success" });
      navigate(appRoutes.polls);
    }
  };

  const handleChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  // hooks
  const { id } = useParams();
  const { loading } = useFetch({ fn: getData, auto: id });
  const { makeRequest, loading: submitLoading } = useFetch({ fn: submitPoll });
  const navigate = useNavigate();
  console.log(values.selectedChoices);
  //   renders
  const renderPoll = () => {
    if (loading) return <Loader />;
    else
      return (
        <>
          <h1
            className={cn(styles.pollQuestion, "")}
            dangerouslySetInnerHTML={{ __html: poll.question }}
          ></h1>
          {poll.pollType === 0 && (
            <SelectivePoll
              {...poll}
              multiple={false}
              disabled={poll.answer ? true : false}
              onChange={(values) => handleChange(values, "selectedChoices")}
              selecteds={values.selectedChoices}
            />
          )}
          {poll.pollType === 1 && (
            <SelectivePoll
              multiple
              {...poll}
              disabled={poll.answer ? true : false}
              onChange={(values) => handleChange(values, "selectedChoices")}
              selecteds={values.selectedChoices}
            />
          )}
          {poll.pollType === 2 && (
            <DescriptivePoll
              {...poll}
              editable={poll.answer ? false : true}
              value={values.text}
              onChange={(value) => handleChange(value, "text")}
            />
          )}
          {!poll.answer && (
            <Button
              onClick={makeRequest}
              className={styles.pollButton}
              loading={submitLoading}
            >
              ارسال
            </Button>
          )}
          {poll.answer && (
            <p className="mt-8 text-red-600">
              شما قبلا در این نظرسنجی شرکت کرده اید.
            </p>
          )}
        </>
      );
  };
  return (
    <>
      <section
        className={CN.join(styles.wrapper, loading ? styles.loading : "")}
      >
        {renderPoll()}
      </section>
    </>
  );
};

export default Poll;
