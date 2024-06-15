import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "../../components/Icon/Icon";
import useFetch from "../../hooks/useFetch";
import { api, complaintApi } from "../../services/http";
import {
  appConstants,
  appRoutes,
  contentTypes,
  httpMethods,
} from "../../utils/variables";
import useInstance from "../../hooks/useInstance";
import { LS } from "../../utils/functions";

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
    id: "details",
    title: "جزئیات",
    icon: () => <Icon name="file-alt" type="far" />,
    order: 3,
    active: true,
    required: false,
  },
  {
    id: "attachments",
    title: "پیوست",
    icon: () => <Icon name="caret-square-up" type="far" />,
    order: 4,
    active: true,
    required: false,
  },
  {
    id: "review",
    title: "بازبینی",
    icon: () => <Icon name="calendar-check" type="far" />,
    order: 5,
    active: true,
    required: false,
  },
];

const useNewComplaint = () => {
  // states
  const [currentStep, setCurrentStep] = useState(allStepsDefault[0]);
  const [allSteps, setAllSteps] = useState(allStepsDefault);
  const [values, setValues] = useState({
    category: {},
    comments: "",
    firstName: "",
    laststName: "",
    nationalId: "",
    attachments: [],
    city: null,
  });
  const { currentInstance, instances, setAppInstance } = useInstance();
  // functions
  const goToNextStep = () => {
    const nextStep = allSteps.find((s) => s.order === currentStep.order + 1);
    setCurrentStep(nextStep);
    console.log(values);
  };

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
  };

  const getPayload = () => {
    const formData = new FormData();
    formData.append("instanceId", values.city?.id);
    formData.append("categoryId", values.category.id);
    formData.append("description", values.comments);
    formData.append("firstName", values.firstName);
    formData.append("laststName", values.laststName);
    formData.append("nationalId", values.nationalId);
    values.attachments.forEach((a) => formData.append("attachments", a.file));
    const instance = LS.read(appConstants.SH_CT_INSTANCE);
    const payload = {
      instanceId: instance.id,
      categoryId: values.category.id,
      description: values.comments,
      attachments: values.attachments.map((a) => a.id),
    };
    return payload;
  };

  const onSubmit = async () => {
    const payload = getPayload();
    const { success } = await complaintApi.CitizenComplaint({
      payload,
      method: httpMethods.post,
      isPerInstance: false,
    });
    if (success) {
      navigate(appRoutes.myComplaints);
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
  };
};

export default useNewComplaint;
