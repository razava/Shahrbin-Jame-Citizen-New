import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AppStore } from "../store/AppContext";
import { AUTHENTICATOR, LS, URI, USER } from "../utils/functions";
import { appConstants, appRoutes } from "../utils/variables";

const useAuthenticate = () => {
  //   store
  const [store, dispatch] = useContext(AppStore);

  //   variables
  // const { currentAuthMode } = store;
  const isAuthenticated = !!LS.read(appConstants.SH_CT_ACCESS_TOKEN);
  //&&
  // !AUTHENTICATOR.isTokenExpired();
  // functions
  // const changeAuthMode = (to = {}) => {
  //   if (searchParams.get("mode") === to.name) return;
  //   dispatch({ type: appActions.SET_AUTH_MODE, payload: to });
  //   navigate({ pathname: appRoutes.auth, search: `?mode=${to.name}` });
  // };

  const saveUserData = (data) => {
    LS.save(appConstants.SH_CT_ACCESS_TOKEN, data.jwtToken);
    LS.save(appConstants.SH_CT_REFRESH_TOKEN, data.refreshToken);

    // LS.save(appConstants.SH_CT_USER_ROLES, data.roles);
    // LS.save(appConstants.SH_CT_CURRENT_TIME, data.currentTime);
    // LS.save(appConstants.SH_CT_EXPIRATION, data.expiration);
  };

  const onSignInSuccess = (data) => {
    saveUserData(data);
    const returnTo = URI.create(pathname + search).searchParams.get("returnTo");
    navigate({
      pathname: returnTo ? decodeURIComponent(returnTo) : appRoutes.menu,
    });
  };

  const logout = () => {
    USER.clear();
    navigate(appRoutes.signin);
  };

  //   hooks
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();

  return {
    // changeAuthMode,
    onSignInSuccess,
    logout,
    // authMode: currentAuthMode,
    isAuthenticated,
  };
};

export default useAuthenticate;
