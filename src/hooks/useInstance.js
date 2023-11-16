import { useContext, useState } from "react";
import { api } from "../services/http";
import { AppStore } from "../store/AppContext";
import { appActions, appConstants } from "../utils/variables";
import { LS } from "../utils/functions";

const useInstance = () => {
  //   store
  const [store, dispatch] = useContext(AppStore);

  //   states
  const [isSuccess, setIsSuccess] = useState(false);

  // functions
  const getInstances = async () => {
    try {
      const { data, success } = await api.instanceManagement({
        showMessageOnError: false,
        isPerInstance: false,
      });
      if (success) {
        dispatch({ type: appActions.SET_INSTANCES, payload: data });
        setAppInstance(getCurrentInstance(data));
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      setIsSuccess(false);
    }
  };

  const getCurrentInstance = (instances = []) => {
    const instance = LS.read(appConstants.SH_CT_INSTANCE);
    if (instance) return instance;
    return instances?.[0] || null;
  };

  const setAppInstance = (instance) => {
    LS.save(appConstants.SH_CT_INSTANCE, instance);
    dispatch({ type: appActions.SET_INSTANCE, payload: instance });
  };

  return {
    isSuccess,
    instances: store.instances,
    currentInstance: store.instance,
    getInstances,
    getCurrentInstance,
    setAppInstance,
  };
};

export default useInstance;
