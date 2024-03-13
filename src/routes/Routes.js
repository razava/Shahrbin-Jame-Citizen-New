import React, { Suspense, lazy } from "react";
import { Routes as Switch, Route } from "react-router-dom";
import SuspenseProgress from "../components/Progress/SuspenseProgress";
import { appRoutes } from "../utils/variables";
import GlobalRoute from "./GlobalRoute";
import RedirectRoute from "./RedirectRoute";
import Authentication from "../components/Authentication/Authentication";

import SignIn from "../pages/SignIn/SignIn";
// import SignUp from "../pages/SignUp/SignUp";
import Verify from "../pages/Verify/Verify";
// import ForgotPass from "../pages/ForgotPass/ForgotPass";
// import ResetPass from "../pages/ResetPass/ResetPass";
import Intro from "../pages/Intro/Intro";
import Pnp from "../pages/Pnp/Pnp";
import UserContainer from "../components/User/UserContainer";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Menu from "../pages/Menu/Menu";
import NewRequest from "../pages/NewRequest/NewRequest";
import RecentRequests from "../pages/RecentRequests/RecentRequests";
import Request from "../pages/Request/Request";
import MyRequests from "../pages/MyRequests/MyRequests";
import Polls from "../pages/Polls/Polls";
import Poll from "../pages/Poll/Poll";
import News from "../pages/News/News";
import Settings from "../pages/Settings/Settings";
import Profile from "../pages/Profile/Profile";
import Password from "../pages/Password/Password";
import Notifications from "../pages/Notifications/Notifications";
import NewComplaint from "../pages/NewComplaint/NewComplaint";
import MyComplaints from "../pages/MyComplaints/MyComplaints";
import Complaint from "../pages/Complaint/Complaint";
import Feedback from "../pages/Feedback/Feedback";
import FAQ from "../pages/FAQ/FAQ";
import useSignalR from "../hooks/useSignalR";

const RateReport = lazy(() => import("../pages/RateReport/RateReport"));
const LoginGov = lazy(() => import("../pages/LoginGov/LoginGov"));
const LoginYazd = lazy(() => import("../pages/LoginYazd/LoginYazd"));

const Routes = () => {
  const signalr = useSignalR();
  // renders
  const renderRedirectRoutes = () => {
    return (
      <>
        <Route exact path="/" element={<RedirectRoute />} />
      </>
    );
  };

  const renderGlobalRoutes = () => {
    return (
      <>
        <Route path={appRoutes.rateReport} element={<RateReport />} />
        {/* <Route path={appRoutes.pnp} element={<Pnp />} /> */}
      </>
    );
  };
  return (
    <>
      <Suspense fallback={<SuspenseProgress />}>
        <Switch>
          {renderRedirectRoutes()}

          {renderGlobalRoutes()}

          {/* auth routes */}
          <Route
            path={appRoutes.auth}
            element={
              <Authentication>
                {(context) => <GlobalRoute context={context} />}
              </Authentication>
            }
          >
            <Route path={appRoutes.intro} element={<Intro />} />
            <Route path={appRoutes.signin} element={<SignIn />} />
            {/* <Route path={appRoutes.signup} element={<SignUp />} /> */}
            <Route path={appRoutes.verify} element={<Verify />} />
            {/* <Route path={appRoutes.forgotpass} element={<ForgotPass />} /> */}
            {/* <Route path={appRoutes.resetpass} element={<ResetPass />} /> */}
            <Route path={appRoutes.signinGov} element={<LoginGov />} />
            <Route path={appRoutes.pnpAuth} element={<Pnp />} />
          </Route>
          <Route path={appRoutes.yazd} element={<LoginYazd />} />

          {/* user routes */}
          <Route
            path={appRoutes.user}
            element={
              <UserContainer>
                {(context) => <AuthenticatedRoute context={context} />}
              </UserContainer>
            }
          >
            <Route path={appRoutes.menu} exact element={<Menu />} />
            <Route path={appRoutes.newRequest} exact element={<NewRequest />} />
            <Route
              path={appRoutes.newComplaint}
              exact
              element={<NewComplaint />}
            />
            <Route
              path={appRoutes.recentRequests}
              element={<RecentRequests />}
            />
            <Route path={appRoutes.request} element={<Request />} />
            <Route path={appRoutes.complaint} element={<Complaint />} />
            <Route path={appRoutes.myRequests} element={<MyRequests />} />
            <Route path={appRoutes.myComplaints} element={<MyComplaints />} />
            <Route path={appRoutes.feedback} element={<Feedback />} />
            <Route path={appRoutes.polls} element={<Polls />} />
            <Route path={appRoutes.poll} element={<Poll />} />
            <Route path={appRoutes.news} element={<News />} />
            <Route path={appRoutes.settings} element={<Settings />} />
            <Route path={appRoutes.profile} element={<Profile />} />
            <Route path={appRoutes.FAQ} element={<FAQ />} />
            <Route path={appRoutes.password} element={<Password />} />
            <Route path={appRoutes.notifications} element={<Notifications />} />
            <Route path={appRoutes.pnpUser} element={<Pnp />} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default Routes;
