import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import { CN, STR } from "../../utils/functions";
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
      setValues({
        ...values,
        selectedChoices: data.answers?.[0]?.choices || [],
      });
    }
  };

  const submitPoll = async () => {
    const payload = {
      ...values,
      selectedChoices: values.selectedChoices.map((s) => s.id),
    };
    const { success, data } = await api.CitizenPolls({
      tail: "Polls/Answer",
      payload,
      method: httpMethods.post,
      id: poll.id,
    });
    if (success) {
      toast("با تشکر از مشارکت شما نظر شما ثبت شد.", { type: "success" });
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

  //   renders
  const renderPoll = () => {
    if (loading) return <Loader />;
    else
      return (
        <>
          <h1
            className={styles.pollQuestion}
            dangerouslySetInnerHTML={{ __html: STR.parseHtml(poll.question) }}
          ></h1>
          {poll.pollType === 0 && (
            <SelectivePoll
              {...poll}
              multiple={false}
              onChange={(values) => handleChange(values, "selectedChoices")}
              selecteds={values.selectedChoices}
            />
          )}
          {poll.pollType === 1 && (
            <SelectivePoll
              multiple
              {...poll}
              onChange={(values) => handleChange(values, "selectedChoices")}
              selecteds={values.selectedChoices}
            />
          )}
          {poll.pollType === 2 && (
            <DescriptivePoll
              {...poll}
              value={values.text}
              onChange={(value) => handleChange(value, "text")}
            />
          )}
          <Button
            onClick={makeRequest}
            className={styles.pollButton}
            loading={submitLoading}
          >
            ارسال
          </Button>
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
