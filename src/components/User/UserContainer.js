import React from "react";
import useResponsive from "../../hooks/useResponsive";
import InitialLoader from "../Loader/InitialLoader";
import UserContainerMobile from "./UserContainerMobile";
import UserContainerDesktop from "./UserContainerDesktop";
import { Navigate } from "react-router-dom";
import { appRoutes } from "../../utils/variables";

// const UserContainerMobile = React.lazy(() => import("./UserContainerMobile"));
// const UserContainerDesktop = React.lazy(() => import("./UserContainerDesktop"));

const UserContainer = ({ children }) => {
  // hooks
  const { render, breakPoint } = useResponsive({
    config: {
      680: <UserContainerMobile>{children}</UserContainerMobile>,
      default: <UserContainerDesktop>{children}</UserContainerDesktop>,
    },
  });
  
  return (
    <>
      <InitialLoader>{render()}</InitialLoader>
    </>
  );
};

export default UserContainer;
