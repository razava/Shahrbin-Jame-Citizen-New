import { useEffect, useRef, useState } from "react";

const usePagination = ({ type = "scroll" } = {}) => {
  // refs
  const observeRef = useRef(null);

  //   states
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paginationData, setPaginationData] = useState({});
  const [isIntersecting, setIntersecting] = useState(false);

  //   variables
  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    { threshold: 0.2 }
  );

  // functions
  const extractPaginationData = (headers) => {
    if (headers && headers.get("x-pagination")) {
      const data = JSON.parse(headers.get("x-pagination"));
      setPaginationData(data);
      return data;
    }
  };

  const observeElement = (
    <div ref={observeRef} style={{ width: "100%", height: 1 }}></div>
  );

  //   effects
  useEffect(() => {
    console.log(observeRef);
    if (type === "scroll" && observeRef.current) {
      observer.observe(observeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observeRef.current]);
  return {
    pageNumber,
    pageSize,
    paginationData,
    isIntersecting,
    observeElement,
    setPageNumber,
    setPageSize,
    extractPaginationData,
  };
};

export default usePagination;
