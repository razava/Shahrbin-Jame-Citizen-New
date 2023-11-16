import React from "react";
import { Navigate } from "react-router-dom";
import useAuthenticate from "../hooks/useAuthenticate";
import { appRoutes } from "../utils/variables";

const RedirectRoute = ({ redirectTo = "" }) => {
  // hooks
  const { isAuthenticated } = useAuthenticate();

  return (
    <Navigate
      to={redirectTo || isAuthenticated ? appRoutes.menu : appRoutes.intro}
    />
  );
};

export default RedirectRoute;
