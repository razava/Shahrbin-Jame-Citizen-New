import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import noImage from "../../assets/images/no-image.jpeg";
import { CN, DNT, URI } from "../../utils/functions";
import Map from "../../components/Map/Map";
import Icon from "../../components/Icon/Icon";
import RequestStatus from "../../components/Requests/RequestStatus";
import { api } from "../../services/http";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";

const Request = () => {
  // states
  const [request, setRequest] = useState({});

  // functions
  const getData = async () => {
    const { success, data } = await api.CitizenReport({ tail: "Mine", id });
    if (success) setRequest(data);
  };

  // hooks
  const { id } = useParams();
  const { loading } = useFetch({ fn: getData, auto: id });

  //   renders
  const renderContent = () => {
    if (loading) return <Loader />;
    else
      return (
        <>
          {renderDetailsCard()}
          {renderAddressCard()}
          {renderOtherDetailsCard()}
        </>
      );
  };

  const renderDetailsCard = () => {
    console.log(request);
    const images = request.medias.filter((media) => media.mediaType === 0);
    const image =
      images.length > 0 ? URI.createMediaUri(images[0].url) : noImage;
    return (
      <section className={styles.card}>
        <figure className={styles.requestImage}>
          <img src={image} />
        </figure>

        <div className={styles.cardBody}>
          <RequestStatus lastStatus={request.lastStatus} />
          <p className={styles.requestCategory}>{request.category?.title}</p>
          <p className={styles.requestComments}>{request.comments}</p>
          <div className={styles.requestDetails}>
            <p className={styles.requestTrackingNumber}>
              <span>کد رهگیری: </span>
              <span>{request.trackingNumber}</span>
            </p>
            <p className={styles.requestDateTime}>
              {DNT.toJalaliString(request.sent)}
            </p>
          </div>
        </div>
      </section>
    );
  };

  const renderAddressCard = () => {
    return (
      <section className={styles.card}>
        <h2 className={styles.requestAddressTitle}>نشانی</h2>
        <Map
          selectable={false}
          searchable={false}
          height={200}
          coords={{
            latitude: request.address.latitude,
            longitude: request.address.longitude,
          }}
        />
        <div className={styles.cardBody}>
          <div className={styles.requestAddress}>
            <Icon name="map-marker-alt" className={styles.requestAddressIcon} />
            <p className={styles.requestAddressDetails}>
              {request.address.detail}
            </p>
          </div>
        </div>
      </section>
    );
  };

  const renderOtherDetailsCard = () => {
    return (
      <section className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.requestInfo}>
            <p className={styles.requestInfoTitle}>زمان پاسخگویی : </p>
            <p className={styles.requestInfoValue}>
              {DNT.toJalaliString2(request?.responseDeadline)}
            </p>
          </div>

          <div className={styles.requestInfo}>
            <p className={styles.requestInfoTitle}>زمان اتمام : </p>
            <p className={styles.requestInfoValue}>
              {DNT.toJalaliString2(request?.deadline)}
            </p>
          </div>

          <div className={styles.requestInfo}>
            <p className={styles.requestInfoTitle}>تعداد نظرات : </p>
            <p className={styles.requestInfoValue}>{request.commentsCount}</p>
          </div>

          <div className={styles.requestInfo}>
            <p className={styles.requestInfoTitle}>تعداد پسندها : </p>
            <p className={styles.requestInfoValue}>{request.likes}</p>
          </div>

          <div className={styles.requestInfo}>
            <p className={styles.requestInfoTitle}>هویت : </p>
            <p className={styles.requestInfoValue}>
              {request.isIdentityVisible ? "قابل رویت" : "مخفی"}
            </p>
          </div>
        </div>
      </section>
    );
  };
  return (
    <>
      <section
        className={CN.join(styles.wrapper, loading ? styles.loading : "")}
      >
        {renderContent()}
      </section>
    </>
  );
};

export default Request;
