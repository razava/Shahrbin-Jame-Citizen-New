import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import usePagination from "../../hooks/usePagination";
import Loader from "../../components/Loader/Loader";
import { api } from "../../services/http";
import styles from "./styles.module.css";
import NotificationCard from "./NotificationCard";
import { CN } from "../../utils/functions";

const Notifications = () => {
  // states
  const [messages, setMessages] = useState([]);

  // functions
  const getData = async (
    { pageNumber = 1, pageSize = 10 } = { pageNumber: 1, pageSize: 10 }
  ) => {
    const params = {
      pageNumber,
      pageSize,
    };
    const { success, data, headers } = await api.Messages({
      params,
      isPerInstance: true,
    });
    if (success) {
      extractPaginationData(headers);
      setMessages((prev) => [...prev, ...data]);
    }
  };

  // hooks
  const { loading, makeRequest } = useFetch({ fn: getData });
  const {
    isIntersecting,
    paginationData,
    observeElement,
    extractPaginationData,
  } = usePagination({
    type: "scroll",
  });

  //   effects
  useEffect(() => {
    if (isIntersecting) {
      const { CurrentPage = 0, PageSize = 10 } = paginationData;
      makeRequest({ pageNumber: CurrentPage + 1, pageSize: PageSize });
    }
  }, [isIntersecting]);

  // renders
  const renderLoader = () => {
    if (loading) return <Loader />;
  };

  const renderMessages = () => {
    return (
      <>
        {messages.map((message) => (
          <NotificationCard key={message.id} message={message} />
        ))}
        {observeElement}
      </>
    );
  };
  return (
    <>
      <section
        className={CN.join(styles.wrapper, loading ? styles.loading : "")}
      >
        {renderMessages()}
        {renderLoader()}
      </section>
    </>
  );
};

export default Notifications;
