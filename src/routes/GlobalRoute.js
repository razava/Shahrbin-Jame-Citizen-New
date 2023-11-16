import React from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import useAuthenticate from "../hooks/useAuthenticate";
import { appRoutes } from "../utils/variables";

const GlobalRoute = ({context}) => {
  // hooks
  const { isAuthenticated } = useAuthenticate();
  const [searchParams] = useSearchParams();

  // variables
  const returnUrl = searchParams.get("returnUrl");
  return isAuthenticated ? (
    <Navigate to={returnUrl || appRoutes.home} />
  ) : (
    <Outlet context={context} />
  );
};

export default GlobalRoute;
