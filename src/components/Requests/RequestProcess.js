import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import { DNT, URI } from "../../utils/functions";
import { statusColors, statusIcons } from "../../utils/variables";
import Loader from "../Loader/Loader";
import styles from "./styles.module.css";
import ph from "../../assets/images/defaultPh.png";
import Icon from "../Icon/Icon";

const RequestProcess = ({
  history = [],
  requestId,
  highlight,
  keys = {
    name: "message",
    date: "dateTime",
    attachments: "attachments",
    actor: "actor",
  },
}) => {
  // states
  const [data, setData] = useState(history);

  // functions
  const getData = async () => {
    console.log("hoo");
    const { success, data } = await api.CitizenReport({
      tail: "ReportHistory",
      id: requestId,
      isPerInstance: false,
    });
    if (success) setData(data);
  };
  console.log(requestId);
  //   hooks
  const { loading } = useFetch({ fn: getData, auto: true }); //auto: requestId });

  //   renders
  const renderContent = () => {
    if (loading) return <Loader />;
    else
      return (
        <section className={styles.requestProcessTimeLineWrapper}>
          <>
            <div className={styles.requestProcessTimeLine}></div>
            {data.map((log, i) => (
              <article
                key={log.id}
                className={styles.requestProcessTimeLineItem}
              >
                {renderTimeLineContent(log)}
                {renderTimeLineCircle(log)}
                {renderTimeLineStamp(log, highlight)}
              </article>
            ))}
          </>
        </section>
      );
  };

  const renderTimeLineContent = (log) => {
    return (
      <div className={styles.requestProcessTimeLineContent}>
        <div
          className={styles.requestProcessTimeLineItemMessage}
          style={{
            backgroundColor: statusColors[log[keys.name]] || "var(--blue)",
          }}
        >
          <span>
            {log[keys.name]}
            {log[keys.actor] !== null && <> توسط {log[keys.actor].title}</>}
          </span>
        </div>
        <div className={styles.requestProcessLogDetails}>
          {log.reason && <span>{log?.reason?.title}</span>}
          {log.description && <span>{log?.description}</span>}
          {log.isPublic && log.comment && <span>{log?.comment}</span>}
          {log.isPublic && log[keys.attachments].length > 0 && (
            <>
              <div className={styles.requestProcessLogAttachmentsTitle}>
                <span>پیوست ها</span>
              </div>
              <div className={styles.requestProcessLogAttachments}>
                {log[keys.attachments].map((a, i) => {
                  if (a.mediaType === 0) {
                    return (
                      <div
                        className={styles.requestProcessLogAttachment}
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   URI.download(a.url);
                        // }}
                        key={i}
                      >
                        <img src={URI.createMediaUri(a.url)} />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={styles.requestProcessLogAttachment}
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          URI.download(a.url);
                        }}
                      >
                        <img src={ph} />
                      </div>
                    );
                  }
                })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderTimeLineCircle = (log) => {
    return (
      <div
        className={styles.requestProcessLogCircle}
        style={{
          backgroundColor: statusColors[log[keys.name]] || "var(--blue)",
        }}
      >
        <span>
          <i className={statusIcons[log[keys.name]] || "fas fa-question"}></i>
        </span>
      </div>
    );
  };

  const renderTimeLineStamp = (log, highlight) => {
    return (
      <div className={styles.requestProcessLogStamp}>
        <span
          className={styles.requestProcessLogStampTime}
          style={{
            color: statusColors[log[keys.name]] || "var(--blue)",
          }}
        >
          {DNT.toJalaliString(log[keys.date], "HH:mm:ss")}
        </span>
        <span
          className={styles.requestProcessLogStampDate}
          style={{
            color: statusColors[log[keys.name]] || "var(--blue)",
          }}
        >
          {DNT.toJalaliString(log.dateTime, "YYYY/MM/DD")}
        </span>
        {highlight?.[keys.date] === log?.[keys.date] && (
          <Icon
            name={"long-arrow-alt-left"}
            className={styles.requestProcessLogHighLight}
          />
        )}
      </div>
    );
  };
  return (
    <>
      <section className={styles.requestProcessWrapper}>
        {renderContent()}
      </section>
    </>
  );
};

export default RequestProcess;
