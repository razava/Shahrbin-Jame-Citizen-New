import React, { useEffect, useState } from "react";

const useObserver = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
    // { threshold: 1,  }
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  return isIntersecting;
};

export default useObserver;
