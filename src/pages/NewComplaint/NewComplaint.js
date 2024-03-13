import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { responsiveBreakPoint } from "../../utils/variables";
import useResize from "../../hooks/useResize";
import { CN } from "../../utils/functions";
import TimeLine from "../NewRequest/TimeLine";
import useNewComplaint from "./useNewComplaint";
import City from "../NewRequest/City";
import ComplaintCategory from "./ComplaintCategory";
import Details from "../NewRequest/Details";
import Attachments from "../NewRequest/Attachments";
import ComplaintReview from "./ComplaintReview";
import useInstance from "../../hooks/useInstance";

const NewComplaint = () => {
  // states
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth > responsiveBreakPoint
  );

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
  } = useNewComplaint();
  const { windowWidth } = useResize();
  const { currentInstance, instances, setAppInstance } = useInstance();
  // effects
  useEffect(() => {
    if (windowWidth > responsiveBreakPoint) setIsDesktop(true);
    else setIsDesktop(false);
  }, [windowWidth]);


  useEffect(() => {
    if (instances.length == 1) {
      goToNextStep();
    }
  }, []);
  // useEffect(() => {
  //   if ((currentStep.id = "category")) {
  //      setTimeout(function () {
  //        setAppInstance({
  //          id: 22,
  //          name: "شهربین بافق",
  //          description: "",
  //          abbreviation: "bfg",
  //          cityId: 1231,
  //          city: null,
  //          englishName: "Bafgh",
  //          latitude: 31.603917,
  //          longitude: 55.406412,
  //        });
  //      }, 1000);
  //   }
  // },[currentStep])
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
        <ComplaintCategory
          goToNextStep={goToNextStep}
          value={values.category}
          onChange={onChange}
          city={values.city}
        />
      );
    else if (currentStep.id === allSteps[2].id)
      return (
        <Details
          goToNextStep={goToNextStep}
          value={values.description}
          onChange={onChange}
          name={{
            description: "comments",
            firstName: "firstName",
            laststName: "laststName",
            nationalId: "nationalId",
          }}
        />
      );
    else if (currentStep.id === allSteps[3].id)
      return (
        <Attachments
          goToNextStep={goToNextStep}
          value={values.attachments}
          onChange={onChange}
        />
      );
    else if (currentStep.id === allSteps[4].id)
      return (
        <ComplaintReview
          values={values}
          loading={loading}
          onSubmit={onSubmit}
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

export default NewComplaint;
