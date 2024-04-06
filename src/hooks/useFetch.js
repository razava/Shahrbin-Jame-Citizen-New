import { useEffect, useState } from "react";
import SnackBar from "../components/SnackBar/SnackBar";
import { appConstants, statusCodes } from "../utils/variables";
import useAuthenticate from "./useAuthenticate";
  
const useFetch = ({
  fn = (f) => f,
  auto = false,
  onFailure = (f) => f,
  initialParameters = {},
  tryAgainOnFailure = false,
  initialLoadingState = false,
}) => {
  // states
  const [loading, setLoading] = useState(auto || initialLoadingState);

  //   hooks
  const { logout } = useAuthenticate();

  // functions
  const makeRequest = async (...args) => {
    setLoading(true);
    try {
      await fn(...args);
      setTimeout(() => {
        setLoading(false);
        SnackBar.hide();
      }, 300);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        onFailure(err);

        if (err.status === statusCodes.unAuthorized) {
          logout();
        } else handleError(err);
      }, 300);
    }
  };

  const handleError = (err) => {
    if (err.isCancelled) return;
    const snackOptions = {
      text:
        err?.errorMessage ||
        err?.data?.message ||
        "مشکلی در ارسال درخواست به وجود آمد.",
      duration: 5000,
      backgroundColor: "var(--red)",
    };
    if (tryAgainOnFailure) {
      snackOptions.action = {
        text: "تلاش مجدد",
        onClick: () => makeRequest(initialParameters),
      };
    }
    // SnackBar.show(snackOptions);
  };

  //   effects
  useEffect(() => {
    if (auto) makeRequest(initialParameters);
  }, [auto]);

  return { loading, makeRequest, setLoading };
};

export default useFetch;
