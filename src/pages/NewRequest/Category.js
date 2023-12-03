import React, { useState } from "react";
import Tree from "../../components/Tree/Tree";
import CategoryItem from "../../components/Category/CategoryItem";
import styles from "./styles.module.css";
import { api } from "../../services/http";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { CN } from "../../utils/functions";

const Category = ({
  goToNextStep = (f) => f,
  onChange = (f) => f,
  value,
  city,
}) => {
  // states
  const [categories, setCategories] = useState({});

  // functions
  const onSelectNode = (data) => {
    onChange(data.tracks.slice(-1)[0], "category");
    goToNextStep();
  };

  const getCategories = async () => {
    const { success, data } = await api.CitizenCommon({
      tail: "Categories",
      instanceId: city?.id,
    });
    if (success) {
      setCategories(data[0]);
    }
  };

  // hooks
  const { loading } = useFetch({ fn: getCategories, auto: true });
  console.log(categories);
  return (
    <>
      <section className={CN.join(styles.categoryWrapper, loading ? styles.loading : "")}>
        {loading ? (
          <Loader />
        ) : (
          <Tree
            data={categories}
            keys={{ tree: "categories", title: "title", value: "id" }}
            renderTreeItem={({ node }) => <CategoryItem item={node} />}
            onSelectNode={onSelectNode}
            name="categories"
          />
        )}
      </section>
    </>
  );
};

export default Category;
