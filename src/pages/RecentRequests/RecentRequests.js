import React from "react";
import AnimatedTabs from "../../components/Tabs/AnimatedTabs";
import AllRequests from "./AllRequests";
import NearestRequests from "./NearestRequests";
import OnMapRequests from "./OnMapRequests";
import styles from "./styles.module.css";
import useResponsive from "../../hooks/useResponsive";
import { responsiveBreakPoint } from "../../utils/variables";
import { CN } from "../../utils/functions";

const RecentRequests = () => {
  // renders
  const renderMobile = () => {
    return (
      <>
        <AnimatedTabs
          classNames={{
            tabs: styles.requestsTabs,
            tab: styles.requestsTab,
            active: styles.requestsActiveTab,
          }}
        >
          <div id="all" label="همه">
            <AllRequests />
          </div>
          <div id="nearest" label="نزدیکترین‌ها">
            <NearestRequests />
          </div>
          <div id="map" label="نقشه">
            <OnMapRequests />
          </div>
        </AnimatedTabs>
      </>
    );
  };

  const renderDesktop = () => {
    return (
      <>
        <div className={CN.join(styles.d_container, styles.d_mapContainer)}>
            <OnMapRequests />
        </div>
        <div className={styles.d_container}>
          <AnimatedTabs
            classNames={{
              tabs: styles.requestsTabs,
              tab: styles.requestsTab,
              active: styles.requestsActiveTab,
            }}
          >
            <div id="all" label="همه">
              <AllRequests />
            </div>
            <div id="nearest" label="نزدیکترین‌ها">
              <NearestRequests />
            </div>
          </AnimatedTabs>
        </div>
      </>
    );
  };

  // hooks
  const { render } = useResponsive({
    config: {
      [responsiveBreakPoint]: renderMobile(),
      default: renderDesktop(),
    },
  });
  return (
    <>
      <section className={styles.container}>{render()}</section>
    </>
  );
};

export default RecentRequests;
