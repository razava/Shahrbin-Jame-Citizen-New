import React, { useContext } from "react";
import useTree from "./useTree";
import { CN } from "../../utils/functions";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import TreeSearch from "./TreeSearch";

const Tree = ({
  data = {},
  keys = { tree: "children", value: "id", title: "title" },
  config,
  name = "",
  title = "",
  renderTreeItem = (f) => f,
  onSelectNode = (f) => f,
  onFirstLevelReached = (f) => f,
}) => {
  // functions
  const onLastLevelReached = (data) => {
    return onSelectNode(data);
  };
  console.log(data);
  // hooks
  const {
    currentNodes,
    currentLevel,
    tracks,
    goIntoNextLevel,
    goIntoSpecificLevel,
    onSearch,
  } = useTree({
    data,
    keys,
    config,
    name,
    onFirstLevelReached,
    onLastLevelReached,
  });
  
  //   renders
  const renderTree = () => {
    console.log(currentNodes);
    return (
      <ul className={CN.join(styles.treeItems)}>
        {currentNodes.map((node) => (
          <div key={node[keys.value]} onClick={() => goIntoNextLevel(node)}>
            {renderTreeItem({ node, currentLevel })}
          </div>
        ))}
      </ul>
    );
  };

  const renderSearch = () => {
    return <TreeSearch onSearch={onSearch} />;
  };

  // const renderTreeTitle = () => {
  //   return <Title title={title} />;
  // };

  const renderBreadCrumb = () => {
    return tracks.length > 0 ? (
      <div className={styles.breadCrumb}>
        {tracks.map((track, i) => renderBread({ item: track, index: i }))}
      </div>
    ) : null;
  };

  const renderBread = ({ item, index }) => {
    return (
      <span
        className={styles.bread}
        onClick={() => goIntoSpecificLevel(index + 1)}
      >
        <span className={styles.breadTitle}>{item[keys.title]}</span>
        {index !== tracks.length - 1 && (
          <span className={styles.breadIcon}>
            <i className="fas fa-angle-left"></i>
          </span>
        )}
      </span>
    );
  };
  return (
    <>
      <section className={styles.treeWrapper}>
        {renderSearch()}
        {/* {renderTreeTitle()} */}
        {renderBreadCrumb()}
        {renderTree()}
      </section>
    </>
  );
};

export default Tree;
