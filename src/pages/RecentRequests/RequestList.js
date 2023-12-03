import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import RequestCard from "../../components/Requests/RequestCard";
import useFetch from "../../hooks/useFetch";
import usePagination from "../../hooks/usePagination";
import { api } from "../../services/http";
import styles from "./styles.module.css";
import NoData from "../../components/NoData/NoData";
import { CN } from "../../utils/functions";

const RequestList = ({
  source = { controller: "", params: { params: {}, rest: {} } },
  isSelfRequest,
}) => {
  // states
  const [data, setData] = useState([]);

  // functions
  const getRequests = async (
    { pageNumber = 1, pageSize = 10 } = { pageNumber: 1, pageSize: 10 }
  ) => {
    const params = {
      pageNumber,
      pageSize,
    };
    try {
      const { success, data, headers } = await api[source.controller]({
      });
      if (success) {
        setData((prev) => [...prev, ...data]);
        extractPaginationData(headers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // hooks
  const {
    paginationData,
    isIntersecting,
    observeElement,
    extractPaginationData,
  } = usePagination({
    type: "scroll",
  });
  const { makeRequest, loading } = useFetch({ fn: getRequests, auto: true });

  //   effects
  useEffect(() => {
    if (isIntersecting) {
      const { CurrentPage = 0, PageSize = 10, HasNext } = paginationData;
      if (HasNext)
        makeRequest({ pageNumber: CurrentPage + 1, pageSize: PageSize });
    }
  }, [isIntersecting]);

  // renders
  const renderRequests = () => {
    if (loading && data.length === 0) return;
    if (data.length > 0)
      return data.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          isSelfRequest={isSelfRequest}
        />
      ));
    else if (data.length === 0)
      return <NoData message="هنوز درخواستی ثبت نکرده‌اید." />;
  };

  return (
    <>
      <section
        className={CN.join(
          styles.requestsList,
          loading && data.length === 0 ? styles.center : ""
        )}
      >
        {renderRequests()}
        {observeElement}
        {loading && <Loader />}
      </section>
    </>
  );
};

export default RequestList;
