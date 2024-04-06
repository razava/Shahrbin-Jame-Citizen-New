import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "../../components/Icon/Icon";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import { appRoutes, contentTypes, httpMethods } from "../../utils/variables";
import useInstance from "../../hooks/useInstance";
import { getRegions } from "../../services/CommonApi";
import { useQuery } from "@tanstack/react-query";

const allStepsDefault = [
  {
    id: "instance",
    title: "شهر",
    icon: () => <Icon name="city" />,
    order: 1,
    active: true,
    required: true,
  },
  {
    id: "category",
    title: "موضوع",
    icon: () => <Icon name="border-all" />,
    order: 2,
    active: true,
    required: true,
  },
  {
    id: "address",
    title: "آدرس",
    icon: () => <Icon name="map" type="far" />,
    order: 3,
    active: true,
    required: true,
  },
  {
    id: "details",
    title: "جزئیات",
    icon: () => <Icon name="file-alt" type="far" />,
    order: 4,
    active: true,
    required: false,
  },
  {
    id: "attachments",
    title: "پیوست",
    icon: () => <Icon name="caret-square-up" type="far" />,
    order: 5,
    active: true,
    required: false,
  },
  {
    id: "review",
    title: "بازبینی",
    icon: () => <Icon name="calendar-check" type="far" />,
    order: 6,
    active: true,
    required: false,
  },
];

const useNewRequest = () => {
  // states
  const [currentStep, setCurrentStep] = useState(allStepsDefault[0]);
  const [allSteps, setAllSteps] = useState(allStepsDefault);

  const [values, setValues] = useState({
    category: {},
    address: {
      details: "",
      coordinates: {
        latitude: null,
        longitude: null,
      },
    },
    comments: "",
    attachments: [],
    isIdentityVisible: false,
    city: null,
    map: { regionId: null, instanceId: null },
  });
  //hooks
  const { currentInstance, instances, setAppInstance } = useInstance();
  // queries
  // const { data, isLoading, isSuccess, refetch } = useQuery({
  //   queryKey: ["Regions"],
  //   queryFn: () => getRegions(instances[0]?.cityId),
  //   enabled: false,
  // });

  // functions
  const goToNextStep = () => {
    const nextStep = allSteps.find((s) => s.order === currentStep.order + 1);
    console.log(nextStep);
    setCurrentStep(nextStep);
    console.log(222);
  };
  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);

  const gtToAddress = () => {
    setCurrentStep({
      id: "address",
      title: "آدرس",
      icon: () => <Icon name="map" type="far" />,
      order: 3,
      active: true,
      required: true,
    });
  };
  // useEffect(() => {
  //   if (isSuccess && data) {
  //     const regionId = data.find(
  //       (item) => item.name === values.region?.[0].title
  //     );
  //     console.log(regionId);
  //     console.log(data?.[0].id);
  //     if (regionId) {
  //       setValues({ ...values, region: regionId.id });
  //     } else {
  //       setValues({ ...values, region: data?.[0].id });
  //     }
  //     // setValues({ ...values, region: data.data });
  //   }
  // }, [data]);
  // 1: checks if the step is even active (could be inActive in some cases)
  // 2: determines the direction user wants to navigate.
  // 3: if direction is backward it's all okay
  // (cause user had to complete required steps to get to that step)
  // 4: if the direction is forward we will check if there's any required steps in tne way
  // 5: if not it's okay. but if there is it will go to the first required step
  const onTimeLineStepClick = (step) => {
    if (!step.active) return;
    const direction = step.order > currentStep.order ? "forward" : "backward";
    if (direction === "forward") {
      // const requiredStepsInTheWay = allSteps.filter(
      //   (s) => s.order >= currentStep.order && s.order < step.order && s.required
      // );
      // if (requiredStepsInTheWay.length === 0) {
      //   setCurrentStep(step);
      // } else {
      //   setCurrentStep(requiredStepsInTheWay[0]);
      // }
    } else if (direction === "backward") {
      setCurrentStep(step);
    }
  };

  const onChange = (value, name) => {
    setValues({ ...values, [name]: value });
    console.log(value, name);
    // if (name == "category") {
    //   console.log(33);
    //   setValues({ ...values, category: value });
    // }
  };

  const getPayload = () => {
    // const formData = new FormData();
    console.log(values.address);
    // console.log(values.attachments);
    const data = {
      categoryId: values.category.id,
      comments: values.detail ? JSON.stringify(values.detail) : values.comments,
      address: {
        regionId: values.map.regionId,
        street: "",
        valley: "",
        detail: values.address.details,
        number: "",
        postalCode: "",
        latitude: values.address.coordinates.latitude,
        longitude: values.address.coordinates.longitude,
        elevation: 0,
      },
      attachments: values.attachments.map((a) => a.id),
      isIdentityVisible: values.isIdentityVisible,
    };
    console.log(data);
    // formData.append("categoryId", values.category.id);
    // formData.append("comments", values.comments);
    // formData.append("address.detail", values.address.details);
    // formData.append("address.latitude", values.address.coordinates.latitude);
    // formData.append("address.longitude", values.address.coordinates.longitude);
    // formData.append("IsIdentityVisible", values.isIdentityVisible);
    // values.attachments.forEach((a) => formData.append("attachments", a.id));
    return data;
  };

  const onSubmit = async () => {
    console.log("gggg");
    const payload = getPayload();
    // const headers = {
    //   "Content-Type": contentTypes.formData,
    // };
    console.log(instances[0]);
    const { success, message } = await api.CitizenReport({
      payload,
      method: httpMethods.post,
      // headers,
      instanceId: values.map.instanceId,
      // instanceId: values?.city?.id ? values.city.id : instances[0].cityId,
    });
    if (success) {
      navigate(appRoutes.myRequests);
      console.log(message);
      toast(message, {
        type: "success",
      });
    }
  };

  //   hooks
  const navigate = useNavigate();
  const { makeRequest, loading } = useFetch({
    fn: onSubmit,
  });

  // effects

  return {
    currentStep,
    allSteps,
    values,
    loading,
    goToNextStep,
    onTimeLineStepClick,
    onChange,
    onSubmit: makeRequest,
    setCurrentStep,
    gtToAddress,
  };
};

export default useNewRequest;
