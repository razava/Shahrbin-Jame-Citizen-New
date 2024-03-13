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
      const { data, success } = await api.CitizenCommon({
        tail: "ShahrbinInstances",
        showMessageOnError: false,
        // isPerInstance: false,
        instanceId: 1,
      });
      if (success) {
        dispatch({ type: appActions.SET_INSTANCES, payload: data });
        console.log(data);
        // setAppInstance(getCurrentInstance(data));
        setAppInstance(data[0]);
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
