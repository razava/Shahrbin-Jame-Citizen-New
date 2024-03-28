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
      console.log(category);
      onChange(category, "category");
    }
    // console.log(currentStep);
    // setfirst(true);
  }, [bool]);
  //   renders
  const renderCurrentStep = () => {
    if (currentStep.id === allSteps[0].id)
      return (
        <City
          goToNextStep={goToNextStep}
          value={values.city}
          onChange={onChange}
        />
      );
    else if (currentStep.id === allSteps[1].id)
      return (
        <Category
          goToNextStep={goToNextStep}
          value={values.category}
          onChange={onChange}
          city={values.city}
        />
      );
    else if (currentStep.id === allSteps[2].id)
      return (
        <Address
          goToNextStep={goToNextStep}
          value={values.address}
          onChange={onChange}
          city={values.city}
        />
      );
    else if (currentStep.id === allSteps[3].id)
      return (
        <Details
          goToNextStep={goToNextStep}
          value={values.comments}
          values={values}
          onChange={onChange}
          name={{ comments: "comments" }}
        />
      );
    else if (currentStep.id === allSteps[4].id)
      return (
        <Attachments
          goToNextStep={goToNextStep}
          value={values.attachments}
          onChange={onChange}
          values={values}
        />
      );
    else if (currentStep.id === allSteps[5].id)
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
