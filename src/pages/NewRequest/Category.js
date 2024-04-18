import React, { useState } from "react";
import Tree from "../../components/Tree/Tree";
import CategoryItem from "../../components/Category/CategoryItem";
import styles from "./styles.module.css";
import { api } from "../../services/http";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { CN, LS } from "../../utils/functions";
import QuickAccess from "./QuickAccess";
import { appConstants } from "../../utils/variables";

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
    console.log(data.tracks.slice(-1)[0]);
    onChange(data.tracks.slice(-1)[0], "category");
    goToNextStep();
  };

  const getCategories = async () => {
    const instance = LS.read(appConstants.SH_CT_INSTANCE);
    const { success, data } = await api.CitizenCommon({
      tail: "Categories",
      isPerInstance: false,
      params: { instanceId: instance?.id },
      // id: instance?.id,
    });
    if (success) {
      // console.log(data);
      setCategories(data);
    }
  };

  // hooks
  const { loading } = useFetch({ fn: getCategories, auto: true });
  console.log(categories);
  return (
    <>
      <section
        className={CN.join(
          styles.categoryWrapper,
          loading ? styles.loading : ""
        )}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="w-full lg:w-[30%] flex flex-col items-center  sm:px-8 mt-2 sticky rounded-xl max-lg:hidden">
              <QuickAccess />
            </div>
            <Tree
              data={categories}
              keys={{ tree: "categories", title: "title", value: "id" }}
              renderTreeItem={({ node }) => <CategoryItem item={node} />}
              onSelectNode={onSelectNode}
              name="categories"
            />
          </>
        )}
      </section>
    </>
  );
};

export default Category;
