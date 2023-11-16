import React, { useEffect, useRef, useState } from "react";
import { CN } from "../../utils/functions";
import styles from "./styles.module.css";
import useResize from "../../hooks/useResize";
import Staggered from "../../components/Animated/Staggered";

const TimeLine = ({
  currentStep,
  allSteps,
  horizontal = false,
  onTimeLineStepClick = (f) => f,
}) => {
  // refs
  const wrapperRef = useRef(null);

  // states
  const [wrapperWidth, setWrapperWidth] = useState(undefined);
  const [stepLength, setStepLength] = useState(40);

  // hooks
  const { windowWidth } = useResize();

  //   variables
  const margin = stepLength / (allSteps.length + 1);
  const progressWrapperLength = wrapperWidth || 0;
  const progress = (stepLength + margin * 2) * (currentStep.order - 1);

  // functions
  const calculate = () => {
    if (horizontal) {
      const wrapperWidth = wrapperRef.current?.offsetWidth;
      const stepLength =
        (wrapperWidth - (allSteps.length - 1) * margin) / allSteps.length || 0;
      setWrapperWidth(wrapperWidth);
      setStepLength(stepLength);
    } else {
      const wrapperHeight = wrapperRef.current?.offsetHeight;
      const stepLength =
        (wrapperHeight - (allSteps.length - 1) * margin) / allSteps.length || 0;
      setWrapperWidth(wrapperHeight);
      setStepLength(stepLength);
    }
  };

  // effects
  useEffect(() => {
    if (wrapperRef.current) calculate();
  }, [wrapperRef.current, windowWidth]);
  return (
    <>
      <ul
        ref={wrapperRef}
        className={CN.join(
          styles.timeLine,
          horizontal ? styles.horizontal : styles.vertical,
          wrapperWidth ? styles.show : ""
        )}
      >
        <Staggered>
          {allSteps.map((step, i) => {
            const radius =
              (stepLength * 2) / 6 > 40 ? 40 : (stepLength * 2) / 6;
            const diameter = radius * 2 + 10;
            return (
              <li
                key={step.id}
                className={CN.join(
                  styles.timeLineStep,
                  currentStep.order === step.order ? styles.isActive : "",
                  currentStep.order > step.order ? styles.isComplete : ""
                )}
                style={{ width: stepLength }}
                onClick={() => onTimeLineStepClick(step)}
              >
                <svg
                  style={{
                    width: diameter,
                    height: diameter,
                  }}
                >
                  <circle cx={radius} cy={radius} r={radius}></circle>
                  <circle cx={radius} cy={radius} r={radius}></circle>
                </svg>
                <div
                  className={styles.timeLineStepIcon}
                  style={{
                    width: diameter - 10,
                    height: diameter - 10,
                  }}
                >
                  {step.icon()}
                </div>
                <p className={styles.timeLineStepTitle}>{step.title}</p>
              </li>
            );
          })}
        </Staggered>

        <div
          className={styles.progressWrapper}
          style={{
            width: horizontal ? progressWrapperLength : 5,
            height: horizontal ? 5 : progressWrapperLength,
            left: horizontal ? stepLength / 6 : `calc(50% + ${12}px)`,
            top: horizontal ? "calc(50% - 15px)" : "50%",
          }}
        >
          <div
            className={styles.progress}
            style={{
              width: horizontal ? progress : 5,
              height: horizontal ? 5 : progress,
            }}
          ></div>
        </div>
      </ul>
    </>
  );
};

export default TimeLine;
