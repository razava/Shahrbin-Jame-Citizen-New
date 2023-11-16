import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/http";
import { AppStore } from "../store/AppContext";
import { DNT, DS, URI } from "../utils/functions";
// import { saveToLocalStorage } from "../utils/functions";
import { appActions, contentTypes, httpMethods } from "../utils/variables";

const useMe = () => {
  // store
  const [store, dispatch] = useContext(AppStore);

  // variables
  const user = store?.initialData?.user || {};

  // states
  const [values, setValues] = useState({
    firstName: store?.initialData?.user?.firstName || "",
    lastName: store?.initialData?.user?.lastName || "",
    nationalId: store?.initialData?.user?.nationalId || "",
    avatarFile: store?.initialData?.user?.avatar
      ? URI.createMediaUri(store?.initialData?.user?.avatar?.url3)
      : "",
    "address.detail": store?.initialData?.user?.address?.detail,
    gender: store?.initialData?.user?.gender,
    educationId: store?.initialData?.user?.education?.id || "",
    birthDate: store?.initialData?.user?.birthDate || "",
    phoneNumber2: store?.initialData?.user?.phoneNumber2 || "",
  });

  const passwordValues = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // functions
  const handleUserDataChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  const handlePasswordDataChange = (value, name) => {
    setValues({ ...passwordValues, [name]: value });
  };

  const getUserData = async () => {
    const { success, data } = await api.userInformation({
      isPerInstance: false,
    });
    if (success) {
      const payload = { ...store.initialData, user: data };
      dispatch({
        type: appActions.SET_INITIALDATA,
        payload,
      });
    }
  };

  const updateUserData = async () => {
    setLoading(true);
    const headers = {
      "Content-Type": contentTypes.formData,
    };
    try {
      const { success } = await api.userInformation({
        method: httpMethods.put,
        payload: DS.toFormData(values),
        headers,
        isPerInstance: false,
      });
      setLoading(false);
      if (success) {
        toast("اطلاعات به‌روزرسانی شد.", { type: "success" });
        getUserData();
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const changeUserPassword = async () => {
    setLoading(true);
    const { success } = await api.authenticate({
      tail: "password",
      method: httpMethods.put,
      payload: passwordValues,
    });
    setLoading(false);
    if (success) {
      toast("رمز عبور به‌روزرسانی شد.", { type: "success" });
    }
  };

  const getUserFullName = () => {
    return `${user.firstName || ""} ${user.lastName || ""}`;
  };

  const getUserTitle = (user) => {
    if (user.firstName || user.lastName)
      return `${user.firstName || ""} ${user.lastName || ""}`;
    else if (user.title) return user.title;
    else return "شهروند";
  };

  // effects
  useEffect(() => {
    setValues({
      firstName: store?.initialData?.user?.firstName || "",
      lastName: store?.initialData?.user?.lastName || "",
      nationalId: store?.initialData?.user?.nationalId || "",
      avatarFile: store?.initialData?.user?.avatar
        ? URI.createMediaUri(store?.initialData?.user?.avatar?.url3)
        : "",
      "address.detail": store?.initialData?.user?.address?.detail || "",
      gender: store?.initialData?.user?.gender,
      educationId: store?.initialData?.user?.educacation?.id || "",
      birthDate: store?.initialData?.user?.birthDate || "",
      phoneNumber2: store?.initialData?.user?.phoneNumber2 || "",
    });
  }, [store.initialData?.user]);

  return {
    handleUserDataChange,
    handlePasswordDataChange,
    updateUserData,
    changeUserPassword,
    getUserData,
    getUserFullName,
    getUserTitle,
    user,
    values,
    passwordValues,
    loading,
  };
};

export default useMe;
