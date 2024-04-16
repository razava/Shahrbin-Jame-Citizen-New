import React, { useState } from "react";
import { Link } from "react-router-dom";
import Staggered from "../../components/Animated/Staggered";
import Icon from "../../components/Icon/Icon";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import { CN, DNT, STR } from "../../utils/functions";
import { appRoutes } from "../../utils/variables";
import styles from "./styles.module.css";
import NoData from "../../components/NoData/NoData";

const Polls = () => {
  //   states
  const [polls, setPolls] = useState([]);

  // functions
  const getData = async () => {
    const instance = LS.read(appConstants.SH_CT_INSTANCE);
    const { success, data } = await api.CitizenPolls({
      tail: "Polls",
      isPerInstance: false,
      id:instance.id
    });
    if (success) setPolls(data);
  };

  //   hooks
  const { loading } = useFetch({ fn: getData, auto: true });

  // variables
  const isInCenter = loading || polls.length === 0;

  // renders
  const renderPolls = () => {
    if (loading) return <Loader />;
    else if (polls.length > 0)
      return (
        <Staggered className={styles.poll}>
          {polls.map((poll) => renderPoll(poll))}
        </Staggered>
      );
    else if (polls.length === 0)
      return <NoData message="در حال حاضر نظرسنجی فعالی وجود ندارد." />;
  };

  const renderPoll = (poll) => {
    return (
      <Link
        key={poll.id}
        to={appRoutes.poll.replace(/:id/, poll.id)}
        className={styles.pollContent}
      >
        <Icon name={"chart-bar"} type="far" className={styles.pollIcon} />
        <p className={styles.pollTitle}>{poll.title}</p>
        <p className={styles.pollQuestion}>{STR.removeTags(poll.question)}</p>
        <p className={styles.pollDate}>{DNT.toJalaliString(poll.created)}</p>
      </Link>
    );
  };
  return (
    <>
      <section
        className={CN.join(styles.polls, isInCenter ? styles.center : "")}
      >
        {renderPolls()}
      </section>
    </>
  );
};

export default Polls;
