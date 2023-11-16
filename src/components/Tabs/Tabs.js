import React, { useEffect, useState } from "react";
import Tab from "./Tab";
import style from "./style.module.css";

const Tabs = ({
  children = [],
  defaultActiveId,
  onTabChange = (f) => f,
  classNames = { tabs: "", active: "", tab: "" },
  styles = { tabs: {}, tab: {} },
  renderBefore = (f) => f,
  renderAfter = (f) => f,
}) => {
  // states
  const [activeTab, setActiveTab] = useState("");

  // classNames
  const wrapperClassName = [style.tabs, classNames.tabs].join(" ");
  const wrapperStyle = styles.tabs;

  // functions
  const onClickTabItem = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  // effects
  useEffect(() => {
    if (children.length > 0) {
      setActiveTab(defaultActiveId ? defaultActiveId : children[0].props.id);
    }
  }, [children.length, defaultActiveId]);

  return (
    <>
      <div className={wrapperClassName} style={wrapperStyle}>
        {renderBefore()}
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
        {renderAfter()}
      </div>
      {children
        .filter((c) => c.props)
        .map((child, i) => {
          if (child.props.id !== activeTab) return undefined;
          return child.props.children;
        })}
    </>
  );
};

export default Tabs;
