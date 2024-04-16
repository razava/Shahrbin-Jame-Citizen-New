import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/http";
import { AppStore } from "../store/AppContext";
import {
  appActions,
  appConstants,
  appRoutes,
  statusCodes,
} from "../utils/variables";
import useAuthenticate from "./useAuthenticate";
import { LS } from "../utils/functions";

const useInitialData = ({ fetchOnMount = false } = {}) => {
  //   store
  const [, dispatch] = useContext(AppStore);
  const { isAuthenticated } = useAuthenticate();

  // states
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [store] = useContext(AppStore);
  const categories = store.initialData.complaintCategories || {};
  // hooks
  const navigate = useNavigate();

  //   functions
  const getInitialData = async () => {
    setDone(false);
    setError(false);
    try {
      const promises = isAuthenticated
        ? [
            fetch(getCategories),
            fetch(getUser),
            fetch(getViolationTypes),
            // fetch(getComplaintCategories),
          ]
        : [];
      const allData = await Promise.all(promises);
      setDone(true);
      const initialData = {
        categories: allData.length > 0 ? allData[0] : {},
        user: allData.length > 1 ? allData[1] : {},
        violationTypes: allData.length > 2 ? allData[2] : {},
        // complaintCategories: allData.length > 3 ? allData[3] : {},
      };
      dispatch({ type: appActions.SET_INITIALDATA, payload: initialData });
    } catch (err) {
      setError(true);
      // getInitialData();
    }
  };

  const fetch = (fn) => {
    return new Promise(async (rs, rj) => {
      try {
        const { success, data, status } = (await fn()) || {};
        if (success) return rs(data);
        else if (status === statusCodes.unAuthorized) {
          navigate(appRoutes.auth);
        } else rj({ data, status, success });
      } catch (err) {
        rj(err);
      }
    });
  };

  const getUser = () => {
    return api.Authenticate({
      showMessageOnError: false,
      isPerInstance: true,
    });
  };

  const getViolationTypes = () => {
    return api.CitizenCommon({
      tail: `ViolationTypes`,
      showMessageOnError: false,
      isPerInstance: false,
    });
  };

  const getCategories = () => {
    const instance = LS.read(appConstants.SH_CT_INSTANCE);
    return api.CitizenCommon({
      tail: `Categories`,
      showMessageOnError: false,
      isPerInstance: false,
      id: instance?.id,
    });
  };

  const getComplaintCategories = () => {
    return api.complaintCategory({
      showMessageOnError: false,
      isPerInstance: false,
    });
  };

  return { getInitialData, done, error };
};

export default useInitialData;
