import React, { useContext, useEffect, useState } from "react";
import useTree from "./useTree";
import { CN, findNodeAndParents } from "../../utils/functions";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import TreeSearch from "./TreeSearch";
import { useQuickStore } from "../../pages/NewRequest/zustand";
import useNewRequest from "../../pages/NewRequest/useNewRequest";
import QuickAccess from "../../pages/NewRequest/QuickAccess";
import { AppStore } from "../../store/AppContext";
import { appActions } from "../../utils/variables";

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

  const {
    goToNextStep,
    gtToAddress,
    setCurrentStep,
    setQuickAccess,
    onChange,
  } = useNewRequest();
  const [store] = useContext(AppStore);
  console.log(store.initialData.categories);
  const [info, setInfo] = useState();
  //effect
  const state = useQuickStore((state) => state.count);
  const Data = useQuickStore((state) => state.data);
  const change = useQuickStore((state) => state.change);
  const bool = useQuickStore((state) => state.bool);
  const del = useQuickStore((state) => state.del);
  const updateCategory = useQuickStore((state) => state.updateCategory);
  const [{ createRequest = {} } = {}, dispatch] = useContext(AppStore);

  function findName(categoryId, children) {
    let level = 0;
    if (Array.isArray(children)) {
      // Yes, check them
      level++;
      for (const childNode of children) {
        console.log(childNode.id);
        // goIntoNextLevel({
        //   id: childNode.id,
        //   order: childNode.order,
        //   code: childNode.code,
        //   title: childNode.title,
        //   description: childNode.description,
        //   attachmentDescription: childNode.attachmentDescription,
        //   duration: childNode.duration,
        //   responseDuration: childNode.responseDuration,
        //   formElements: childNode.formElements,
        //   categories: childNode.categories,
        // });
        if (childNode.id === categoryId) {
          // Found it
          console.log(level);
          return childNode;
        }
        // Look in this node's children
        const found = findName(categoryId, childNode.categories);
        if (found) {
          // Found in this node's children
          return found;
        }
      }
    }
  }
  // useEffect(() => {
  //   onChange(info, "category");
  // }, [info]);
  useEffect(() => {
    if (state) {
      console.log("🚀 ~ file: Tree.js:47 ~ useEffect ~ state:", state);
      console.log(currentNodes);
      console.log(Data);
      // const category = findName(
      //   Data.categoryId,
      //   store?.initialData?.categories.categories
      // );
      console.log(Data.categoryId);
      console.log(store?.initialData?.categories.categories);
      const result = findNodeAndParents(
        store?.initialData?.categories.categories,
        Data.categoryId
      );
      console.log(result);
      if (result) {
        console.log("Node found:", result[result.length - 1]);
        console.log("Parent nodes:", result.slice(0, -1));
        const payload = {
          categories: {
            currentLevel: 3,
            currentNodes: result[result.length - 1].categories,
            tracks: [result[0], result[0].categories],
            navigationStack: result,
          },
        };
        console.log(payload);
        dispatch({
          type: appActions.SET_CREATE_REQUEST,
          payload: {
            categories: {
              currentLevel: result.length + 1,
              currentNodes: result[result.length - 1].categories,
              tracks: result,
              navigationStack: [
                result[0],
                result.map((item, i) => {
                  if (i !== 0) {
                    return item.categories;
                  }
                }),
              ],
            },
          },
        });
      } else {
        console.log("Node not found");
      }
      // console.log(result);

      // console.log(category.categories.length == 0);
      console.log(result[result.length - 1].categories.length);
      const category = result[result.length - 1];
      if (result[result.length - 1].categories.length == 0) {
        console.log("eeeeeeeee");
        // setCurrentStep({
        //   id: "address",
        //   title: "آدرس",
        //   order: 2,
        //   active: true,
        //   required: true,
        // });
        updateCategory(result[result.length - 1]);
        change(!bool);
        onChange(result[result.length - 1], "category");
        // gtToAddress();
        // goToNextStep();
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
