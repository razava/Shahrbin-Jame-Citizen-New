import React, { useContext } from "react";
import Tree from "../../components/Tree/Tree";
import { AppStore } from "../../store/AppContext";
import CategoryItem from "../../components/Category/CategoryItem";
import styles from "./styles.module.css";

const ComplaintCategory = ({
  goToNextStep = (f) => f,
  onChange = (f) => f,
  value,
  city,
}) => {
  // store
  const [store] = useContext(AppStore);
  const categories = store.initialData.complaintCategories || {};

  // functions
  const onSelectNode = (data) => {
    onChange(data.tracks.slice(-1)[0], "category");
    goToNextStep();
  };

  return (
    <>
      <section className={styles.categoryWrapper}>
        <Tree
          data={categories}
          keys={{ tree: "children", title: "title", value: "id" }}
          renderTreeItem={({ node }) => <CategoryItem item={node} />}
          onSelectNode={onSelectNode}
          // config={value}
          name="complaintCategory"
        />
      </section>
    </>
  );
};

export default ComplaintCategory;
