import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import Tab from "./Tab";

const AnimatedTabs = ({
  children = [],
  defaultActiveId,
  onTabChange = (f) => f,
  classNames = { tabs: "", active: "", tab: "" },
  styles = { tabs: {}, tab: {} },
  renderBefore = (f) => f,
  renderAfter = (f) => f,
}) => {
  // refs
  const wrapperRef = useRef(null);

  // states
  const [activeTab, setActiveTab] = useState("");
  const [thumbStyle, setThumbStyle] = useState({});

  //   hooks

  // classNames
  const wrapperClassName = [style.tabs, classNames.tabs].join(" ");
  const wrapperStyle = styles.tabs;

  // functions
  const onClickTabItem = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
    handleThumb(tab);
  };

  const handleThumb = (tabId) => {
    const index = Array.from(children).findIndex((c) => c.props.id === tabId);
    if (index !== -1) {
      const child = wrapperRef.current.children[index + 1];
      console.log(
        wrapperRef.current?.getBoundingClientRect().right,
        child?.getBoundingClientRect().right
      );
      const thumbStyle = {
        width: child.getBoundingClientRect().width + "px",
        height: "calc(100% - 0px)",
        right:
          wrapperRef.current?.getBoundingClientRect().right -
          child?.getBoundingClientRect().right -
          1,
      };
      setThumbStyle(thumbStyle);
    }
  };

  // effects
  useEffect(() => {
    if (children.length > 0) {
      const tabId = defaultActiveId ? defaultActiveId : children[0].props.id;
      handleThumb(tabId);
      setActiveTab(tabId);
    }
  }, [children.length, defaultActiveId]);

  //   renders
  const renderThumb = () => {
    return <div style={thumbStyle} className={style.thumb}></div>;
  };

  const content =
    children.filter((c) => c.props.id === activeTab)?.[0]?.props?.children ||
    null;
  return (
    <>
      <div className={wrapperClassName} ref={wrapperRef} style={wrapperStyle}>
        {renderThumb()}
        {renderBefore()}
        {/* <Staggered> */}
        {children
          .filter((c) => c.props)
          .map((child, i) => {
            const { label, id } = child.props;
            return (
              <Tab
                key={i}
                activeTab={activeTab}
                label={label}
                handleClick={onClickTabItem}
                tabId={id}
                classNames={classNames}
                styles={styles}
              />
            );
          })}
        {/* </Staggered> */}
        {renderAfter()}
      </div>
      {content}
    </>
  );
};

export default AnimatedTabs;
