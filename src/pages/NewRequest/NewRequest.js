import React, { useContext, useEffect, useState } from "react";
import Address from "./Address";
import Attachments from "./Attachments";
import Category from "./Category";
import Details from "./Details";
import Review from "./Review";
import styles from "./styles.module.css";
import TimeLine from "./TimeLine";
import useNewRequest from "./useNewRequest";
import useResize from "../../hooks/useResize";
import { CN } from "../../utils/functions";
import City from "./City";
import { AppStore } from "../../store/AppContext";
import useInstance from "../../hooks/useInstance";
import { useQuickStore } from "./zustand";

const NewRequest = () => {
  //store
  const [store, dispatch] = useContext(AppStore);
  const { currentInstance, instances, setAppInstance } = useInstance();
  const change = useQuickStore((state) => state.change);
  const bool = useQuickStore((state) => state.bool);
  const category = useQuickStore((state) => state.category);
  const [first, setfirst] = useState();
  // hooks
  const {
    currentStep,
    allSteps,
    values,
    loading,
    goToNextStep,
    onTimeLineStepClick,
    onChange,
    onSubmit,
    deleteAttachmentStep,
    addAttachmentStep,
  } = useNewRequest();
  const { isDesktop } = useResize();
  //
  useEffect(() => {
    if (instances.length == 1 && currentStep.id == "instance") {
      goToNextStep();
    }
  }, [currentStep]);
  useEffect(() => {
    if (category) {
      goToNextStep();
      onChange(category, "category");
    }
  }, [bool]);


  //   renders
  const renderCurrentStep = () => {
    console.log(currentStep);
    console.log(allSteps);
    if (currentStep.id === "instance")
      return (
        <City
          goToNextStep={goToNextStep}
          value={values.city}
          onChange={onChange}
        />
      );
    else if (currentStep.id === "category")
      return (
        <Category
          goToNextStep={goToNextStep}
          value={values.category}
          onChange={onChange}
          city={values.city}
        />
      );
    else if (currentStep.id === "address")
      return (
        <Address
          goToNextStep={goToNextStep}
          value={values.address}
          onChange={onChange}
          city={values.city}
          deleteAttachmentStep={deleteAttachmentStep}
          addAttachmentStep={addAttachmentStep}
          values={values}
        />
      );
    else if (currentStep.id === "details")
      return (
        <Details
          goToNextStep={goToNextStep}
          value={values.comments}
          values={values}
          onChange={onChange}
          name={{ comments: "comments" }}
        />
      );
    else if (currentStep.id === "attachments")
      return (
        <Attachments
          goToNextStep={goToNextStep}
          value={values.attachments}
          onChange={onChange}
          values={values}
        />
      );
    else if (currentStep.id === "review")
      return (
        <Review
          values={values}
          loading={loading}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      );
  };
  return (
    <>
      <div
        className={CN.join(
          styles.container,
          isDesktop ? styles.d_container : ""
        )}
      >
        <div className={styles.stepContent}>{renderCurrentStep()}</div>
        <TimeLine
          currentStep={currentStep}
          allSteps={allSteps}
          onTimeLineStepClick={onTimeLineStepClick}
          horizontal={!isDesktop}
        />
      </div>
    </>
  );
};

export default NewRequest;
