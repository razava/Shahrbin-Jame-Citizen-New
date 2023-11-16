import { useState, useEffect, useCallback } from "react";
import { responsiveBreakPoint } from "../utils/variables";

function useResize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth > responsiveBreakPoint
  );

  const listener = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  });

  useEffect(() => {
    if (width > responsiveBreakPoint) setIsDesktop(true);
    else setIsDesktop(false);
  }, [width]);

  return {
    windowWidth: width,
    windowHeight: height,
    isDesktop,
  };
}

export default useResize;
