import React, { useContext, useEffect } from "react";
import useTree from "./useTree";
import { CN } from "../../utils/functions";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import TreeSearch from "./TreeSearch";
import { useQuickStore } from "../../pages/NewRequest/zustand";
import useNewRequest from "../../pages/NewRequest/useNewRequest";
import QuickAccess from "../../pages/NewRequest/QuickAccess";

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

  const { goToNextStep, setCurrentStep, setQuickAccess, onChange } =
    useNewRequest();

  //effect
  const state = useQuickStore((state) => state.count);
  const Data = useQuickStore((state) => state.data);
  const del = useQuickStore((state) => state.del);
  useEffect(() => {
    if (state) {
      console.log("🚀 ~ file: Tree.js:47 ~ useEffect ~ state:", state);
      console.log(currentNodes);
      goIntoNextLevel({
        id: Data.category.id,
        order: Data.category.order,
        code: Data.category.code,
        title: Data.category.title,
        description: Data.category.description,
        attachmentDescription: Data.category.attachmentDescription,
        duration: Data.category.duration,
        responseDuration: Data.category.responseDuration,
        formElements: Data.category.formElements,
        categories: currentNodes,
      });
      if (Data.category.processId) {
        setCurrentStep({
          id: "address",
          title: "آدرس",
          order: 2,
          active: true,
          required: true,
        });
        goToNextStep();
        onChange(
          {
            id: Data.category.id,
            order: Data.category.order,
            code: Data.category.code,
            title: Data.category.title,
            description: Data.category.description,
            attachmentDescription: Data.category.attachmentDescription,
            duration: Data.category.duration,
            responseDuration: Data.category.responseDuration,
            formElements: Data.category.formElements,
            categories: Data.category.categories,
            objectionAllowed: Data.category.objectionAllowed,
            hideMap: Data.category.hideMap,
          },
          "category"
        );
        del();
      }
    }
  }, [state]);

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
        <div className="w-full lg:w-[30%] flex flex-col items-center  sm:px-8 mt-2 sticky rounded-xl lg:hidden">
          <QuickAccess />
        </div>
        {renderSearch()}
        {/* {renderTreeTitle()} */}
        {renderBreadCrumb()}
        {renderTree()}
      </section>
    </>
  );
};

export default Tree;
