import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import noImage from "../../assets/images/no-image.jpeg";
import { CN, DNT, URI, b64toBlob } from "../../utils/functions";
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
    const { success, data } = await api.CitizenReport({
      tail: "Mine",
      id,
      isPerInstance: false,
    });
    if (success) setRequest(data);
  };

  // hooks
  const { id } = useParams();
  const { loading } = useFetch({ fn: getData, auto: id });
  // console.log(data);
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
  const a = request?.comments;
  let forms;
  if (a) {
    console.log(a[0]);
    if (a[0] == "{") {
      forms = JSON.parse(request.comments);
    }
  }

  const openFileInNewTab = (base64Data, fileType) => {
    const blob = b64toBlob(base64Data, fileType);
    const blobUrl = URL.createObjectURL(blob);
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(
        '<html style="height: 100%;"><head><title>File Preview</title></head><body style="margin: 0; padding: 0; height: 100%; overflow: hidden;">'
      );

      // Check the file type and handle accordingly
      if (fileType.includes("image")) {
        newTab.document.write(
          `<img src="data:${fileType};base64,${base64Data}" alt="File Preview"/>`
        );
      } else if (fileType === "application/pdf") {
        newTab.document.write(
          `<iframe width="100%" height="100%" src="${blobUrl}"></iframe>`
        );
      } else {
        newTab.document.write(
          `<a href="${blobUrl}" target="_blank">Open in New Tab</a>`
        );
      }

      newTab.document.write("</body></html>");
      newTab.document.close();

      URL.revokeObjectURL(blobUrl);
    } else {
      console.error("Unable to open a new tab.");
    }
  };

  console.log(forms?.values);
  //   request?.comments[0] == "{" ? JSON.parse(request.comments) : null;
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

          {forms?.values ? (
            <>
              <div className=" flex flex-col gap-2 text-xl my-2">
                {forms?.values && (
                  <>
                    {Object.keys(forms.values).map((key, item) => {
                      console.log(forms?.values[key]);
                      if (typeof forms?.values[key].value == "string") {
                        return (
                          <div className="">
                            <span>{forms?.values[key].name}</span>:{" "}
                            <span className=" text-gray-500">
                              {forms?.values[key].value}
                            </span>
                          </div>
                        );
                      } else if (
                        typeof forms?.values[key].value == "object" &&
                        !Array.isArray(forms?.values[key].value)
                      ) {
                        return (
                          <div>
                            {forms?.values[key].name}:{" "}
                            <span className=" text-gray-500">
                              {forms?.values[key].value.title}
                            </span>
                          </div>
                        );
                      } else if (Array.isArray(forms?.values[key].value)) {
                        return (
                          <span className=" flex gap-1">
                            <span>{forms?.values[key].name}:</span>
                            <span className=" flex  gap-1 text-gray-500">
                              <>
                                {forms?.values[key].value.map((item, idx) => {
                                  if (item?.name) {
                                    return (
                                      <span>
                                        {item?.name}{" "}
                                        {forms?.values[key].value.length - 1 !=
                                          idx && ","}
                                      </span>
                                    );
                                  } else if (item?.title) {
                                    return (
                                      <span>
                                        {item.title}
                                        {forms?.values[key].value.length - 1 !=
                                          idx && ","}
                                      </span>
                                    );
                                  }
                                })}
                              </>
                            </span>
                          </span>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            </>
          ) : (
            <p className={styles.requestComments}>{request.comments}</p>
          )}
          <p>پیوست‌ها</p>
          <div className=" text-[#464646] mt-2">
            <div className="flex flex-wrap items-center w-full gap-2 my-2 text-xs  max-md:flex-col">
              {request?.medias.map((item, index) => {
                const fileName = item.url.split("/")[2];
                console.log(fileName);
                return (
                  <div
                    key={index}
                    className=" bg-gray-100 text-[#7C838A] w-full md:w-[30%] rounded-md h-12 p-2 flex justify-between gap-3 items-center"
                  >
                    <a className="flex items-center gap-2 truncate cursor-pointer ">
                      <i style={{ fontSize: "13px" }} class="fas fa-file"></i>
                      <p className=" max-w-full truncate">{fileName}</p>
                    </a>
                    <div
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        URI.download(item.url);
                      }}
                    >
                      <i
                        style={{ fontSize: "13px" }}
                        class="fas fa-download cursor-pointer"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
