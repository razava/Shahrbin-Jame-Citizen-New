import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import RequestList from "./RequestList";
import styles from "./styles.module.css";

const NearestRequests = () => {
  //   states
  const [loading, setLoading] = useState({
    location: true,
    requests: false,
  });
  const [isAvailable, setIsAvailable] = useState(false);
  const [params, setParams] = useState({});

  // effects
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const coordinates = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        };
        setIsAvailable(true);
        setParams({ ...params, coordinates });
        setLoading({ ...loading, location: false });
      },
      (err) => {
        console.log(err);
        setIsAvailable(false);
        setLoading({ ...loading, location: false });
      }
    );
  }, []);

  // renders
  const renderContent = () => {
    if (loading.location)
      return (
        <div className={styles.loader}>
          <Loader />
        </div>
      );
    else if (isAvailable)
      return (
        <RequestList
          source={{
            controller: "report",
            params: { tail: "nearest", params },
          }}
        />
      );
    else
      return (
        <>
          <div>
            <p className={styles.infoText}>
              برای دسترسی به این بخش به برنامه کاربردی شهربین مراجعه کنید.
            </p>
            <Button>دانلود برنامه شهربین</Button>
          </div>
        </>
      );
  };
  return (
    <>
      <section className={styles.requestsList}>{renderContent()}</section>
    </>
  );
};

export default NearestRequests;
