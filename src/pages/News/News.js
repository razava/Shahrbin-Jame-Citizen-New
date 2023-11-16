import React, { useState } from "react";
import Staggered from "../../components/Animated/Staggered";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import { CN, URI } from "../../utils/functions";
import styles from "./styles.module.css";
import NoData from "../../components/NoData/NoData";

const News = () => {
  // states
  const [news, setNews] = useState([]);

  //   functions
  const getData = async () => {
    const { success, data } = await api.news({
      isPerInstance: false,
    });
    if (success) setNews(data);
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
            <a
              style={{
                backgroundImage: `url(${URI.createMediaUri(news.image.url3)})`,
              }}
              target="_blank"
              href={news.url}
              className={styles.newsCardContent}
            >
              <span>
                <p className={styles.newsCardTitle}>{news.title}</p>
              </span>
              <p className={styles.newsCardDesc}>{news.description}</p>
            </a>
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
