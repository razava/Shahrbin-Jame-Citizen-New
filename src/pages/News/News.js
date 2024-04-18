import React, { useState } from "react";
import Staggered from "../../components/Animated/Staggered";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import { CN, LS, URI } from "../../utils/functions";
import styles from "./styles.module.css";
import NoData from "../../components/NoData/NoData";
import { appConstants, appRoutes } from "../../utils/variables";
import { useNavigate } from "react-router-dom";

const News = () => {
  // states
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  //   functions
  const getData = async () => {
    const instance = LS.read(appConstants.SH_CT_INSTANCE);
    const { success, data } = await api.CitizenNews({
      tail: "News",
      isPerInstance: false,
      params: { instanceId: instance?.id },
      // id: instance.id,
    });
    if (success) {
      console.log(success);
      console.log(data);
      setNews(data);
    }
  };

  // hooks
  const { loading } = useFetch({ fn: getData, auto: true });

  // variables
  const isInCenter = loading || news.length === 0;

  //   renders
  const renderNews = () => {
    if (loading) return <Loader />;
    else if (news.length > 0)
      return (
        <Staggered className={styles.newsCard}>
          {news.map((news) => (
            <div
              style={{
                backgroundImage: `url(${URI.createMediaUri(
                  news.imageFile.url4
                )})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                cursor: "pointer",
              }}
              target="_blank"
              href={news.url}
              onClick={() => navigate(`/user/news/${news.id}`)}
              className={styles.newsCardContent}
            >
              <span>
                <p className={styles.newsCardTitle}>{news.title}</p>
              </span>
              <p className={styles.newsCardDesc}>{news.description}</p>
            </div>
          ))}
        </Staggered>
      );
    else if (news.length === 0)
      return <NoData message="هنوز خبری ثبت نشده است." />;
  };
  return (
    <>
      <section
        className={CN.join(styles.wrapper, isInCenter ? styles.center : "")}
      >
        {renderNews()}
      </section>
    </>
  );
};

export default News;
