import { useEffect, useState } from "react";
import useResize from "./useResize";

const useResponsive = ({ config = {} } = {}) => {
  // states
  const [breakPoint, setBreakPoint] = useState();

  // hooks
  const { windowWidth } = useResize();

  // states
  const [component, setComponent] = useState();

  // effects
  useEffect(() => {
    const entries = Object.entries(config);
    const [breakPoint, component] =
      entries
        .filter(([k, v]) => k !== "default")
        .sort((a, b) => (parseInt(a[0]) < parseInt(b[0]) ? -1 : 1))
        .find(([k, v], i) => {
          if (windowWidth < parseInt(k)) return true;
        }) || [];
    setComponent(component || config.default);
    setBreakPoint(breakPoint);
  }, [windowWidth]);

  return { render: () => component, breakPoint };
};

export default useResponsive;
