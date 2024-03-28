import React, { useEffect, useRef, useState } from "react";
import { CN } from "../../utils/functions";
import styles from "./styles.module.css";

const CategoryItem = ({ item }) => {
  // refs
  const containerRef = useRef();
  const textRef = useRef();

  // states
  const [className, setClassName] = useState("");

  // effects
  useEffect(() => {
    if (containerRef.current.clientWidth < textRef.current.clientWidth) {
      setClassName(styles.animate);
    }
  }, []);
  
  return (
    <>
      <div
        className={CN.join(styles.categoryItem, className)}
        ref={containerRef}
      >
        <span ref={textRef}>{item.title}</span>
      </div>
    </>
  );
};

export default CategoryItem;
