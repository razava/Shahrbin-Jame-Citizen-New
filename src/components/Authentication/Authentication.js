import useResponsive from "../../hooks/useResponsive";
import AuthenticationMobile from "./AuthenticationMobile";
import AuthenticationDesktop from "./AuthenticationDesktop";

const Authentication = ({ children }) => {
  // hooks
  const { render } = useResponsive({
    config: {
      680: <AuthenticationMobile>{children}</AuthenticationMobile>,
      default: <AuthenticationDesktop>{children}</AuthenticationDesktop>,
    },
  });

  return <>{render()}</>;
};

export default Authentication;
