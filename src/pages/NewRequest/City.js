import React, { useEffect } from "react";
import useInstance from "../../hooks/useInstance";
import styles from "./styles.module.css";
import { LS } from "../../utils/functions";
import { appConstants } from "../../utils/variables";

const City = ({ onChange = (f) => f, goToNextStep = (f) => f }) => {
  // hooks
  const { currentInstance, instances, setAppInstance } = useInstance();

  //   functions
  const handleClick = (instance) => {
    setAppInstance(instance);
    if (!LS.read(appConstants.SH_CT_CHANGE_INSTANCE)) {
      onChange(instance, "city");
      goToNextStep();
    }
    LS.save(appConstants.SH_CT_CHANGE_INSTANCE, "true");
    console.log(1111);
  };
  useEffect(() => {
    if (LS.read(appConstants.SH_CT_CHANGE_INSTANCE)) {
      onChange(LS.read(appConstants.SH_CT_INSTANCE), "city");
      goToNextStep();
      LS.remove(appConstants.SH_CT_CHANGE_INSTANCE);
      console.log(22);
    }
  }, []);

  // renders
  const renderCity = (instance) => {
    return (
      <div className={styles.city} onClick={() => handleClick(instance)}>
        <p className={styles.cityName}>{instance.name}</p>
        {/* <p className={styles.cityDesc}>{instance.description}</p> */}
      </div>
    );
  };
  return (
    <>
      <section className={styles.cities}>
        {instances.map((instance) => renderCity(instance))}
      </section>
    </>
  );
};

export default City;
