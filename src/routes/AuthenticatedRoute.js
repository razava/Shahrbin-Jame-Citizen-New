import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthenticate from "../hooks/useAuthenticate";
import { URI } from "../utils/functions";
import { appConstants, appRoutes, responsiveBreakPoint } from "../utils/variables";
import useResize from "../hooks/useResize";

const AuthenticatedRoute = ({ context }) => {
  const { isAuthenticated } = useAuthenticate();
  const { windowWidth } = useResize();
  const isDesktop = windowWidth > responsiveBreakPoint;
  const { pathname, search } = useLocation();
  const returnUrl = URI.create(pathname + search).searchParams.get("returnUrl");
  console.log(window.location.pathname);
  if (window.location.pathname.includes("/user/feedback/")) {
    localStorage.setItem(
      appConstants.SH_CT_LOGIN_URL,
      window.location.pathname
    );
  }
    if (isAuthenticated) {
      if (pathname === appRoutes.menu && isDesktop) {
        return <Navigate to={appRoutes.recentRequests} />;
      } else return <Outlet context={context} />;
    } else {
      return <Navigate to={returnUrl ? returnUrl : appRoutes.signin} />;
    }
};

export default AuthenticatedRoute;
