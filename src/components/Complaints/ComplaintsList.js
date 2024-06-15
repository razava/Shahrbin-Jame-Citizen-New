import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import usePagination from "../../hooks/usePagination";
import { api, complaintApi } from "../../services/http";
import styles from "./styles.module.css";
import ComplaintCard from "./ComplaintCard";
import NoData from "../NoData/NoData";
import { CN } from "../../utils/functions";

const ComplaintsList = ({
  source = { controller: "", params: { params: {}, rest: {} } },
  isSelfComplaint,
}) => {
  // states
  const [data, setData] = useState([]);

  // functions
  const getComplaints = async (
    { pageNumber = 1, pageSize = 10 } = { pageNumber: 1, pageSize: 10 }
  ) => {
    const params = {
      pageNumber,
      pageSize,
    };
    try {
      const { success, data, headers } = await complaintApi[source.controller]({
        ...source.params,
        params: { ...params, ...source.params.params },
        ...source.rest,
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
  const { makeRequest, loading } = useFetch({ fn: getComplaints, auto: true });

  //   effects
  useEffect(() => {
    if (isIntersecting) {
      const { CurrentPage = 0, PageSize = 10, HasNext } = paginationData;
      if (HasNext)
        makeRequest({ pageNumber: CurrentPage + 1, pageSize: PageSize });
    }
  }, [isIntersecting]);

  // renders
  const renderComplaints = () => {
    if (loading && data.length === 0) return;
    else if (data.length > 0)
      return data.map((complaint) => (
        <ComplaintCard
          key={complaint.id}
          complaint={complaint}
          isSelfComplaint={isSelfComplaint}
        />
      ));
    else if (data.length === 0)
      return <NoData message="هنوز شکایتی ثبت نکرده‌اید." />;
  };

  const renderLoader = () => {
    if (loading) return <Loader />;
  };
  return (
    <>
      <section
        className={CN.join(
          styles.complaintsList,
          loading && data.length === 0 ? styles.center : ""
        )}
      >
        {renderComplaints()}
        {observeElement}
        {renderLoader()}
      </section>
    </>
  );
};

export default ComplaintsList;
