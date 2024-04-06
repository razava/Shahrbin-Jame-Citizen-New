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
    educationId: Number(store?.initialData?.user?.education),
    birthDate: store?.initialData?.user?.birthDate || "",
    phoneNumber: store?.initialData?.user?.phoneNumber || "",
  });

  const passwordValues = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // functions
  const handleUserDataChange = (value, name) => {
    console.log(value, name);
    setValues({ ...values, [name]: value });
  };

  const handlePasswordDataChange = (value, name) => {
    setValues({ ...passwordValues, [name]: value });
  };

  const handelAvatar = async (value, name) => {
    console.log(value);
    setLoading(true);
    const headers = {
      "Content-Type": contentTypes.formData,
    };
    try {
      const { success, message } = await api.Authenticate({
        method: httpMethods.put,
        payload: DS.toFormData({ File: value, AttachmentType: 0 }),
        headers,
        tail: "Avatar",
        isPerInstance: true,
      });
      setLoading(false);
      if (success) {
        toast(message, { type: "success" });
        getUserData();
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const getUserData = async () => {
    const { success, data } = await api.Authenticate({
      isPerInstance: true,
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
    function clean(obj) {
      for (var propName in obj) {
        if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          obj[propName] === ""
        ) {
          delete obj[propName];
        }
      }
      return obj;
    }
    clean(values);
    const editedValues = values;
    delete editedValues.avatarFile;
    setLoading(true);
    try {
      const { success, message } = await api.Authenticate({
        method: httpMethods.put,
        payload: editedValues,
        isPerInstance: true,
      });
      setLoading(false);
      if (success) {
        console.log(message);
        toast("اطلاعات با موفقیت ویرایش شد.", { type: "success" });
        getUserData();
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const changeUserPassword = async () => {
    setLoading(true);
    const { success, data, message } = await api.Authenticate({
      tail: "Password",
      method: httpMethods.put,
      payload: passwordValues,
    });
    setLoading(false);
    console.log(success);
    if (success) {
      toast(message, { type: "success" });
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
    console.log(Number(store?.initialData?.user?.education));
    setValues({
      firstName: store?.initialData?.user?.firstName || "",
      lastName: store?.initialData?.user?.lastName || "",
      nationalId: store?.initialData?.user?.nationalId || "",
      avatarFile: store?.initialData?.user?.avatar
        ? URI.createMediaUri(store?.initialData?.user?.avatar?.url3)
        : "",
      "address.detail": store?.initialData?.user?.address?.detail || "",
      gender: store?.initialData?.user?.gender,
      educationId: Number(store?.initialData?.user?.education) || "",
      birthDate: store?.initialData?.user?.birthDate || "",
      phoneNumber: store?.initialData?.user?.phoneNumber || "",
    });
  }, [store.initialData?.user]);

  return {
    handleUserDataChange,
    handlePasswordDataChange,
    updateUserData,
    handelAvatar,
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
