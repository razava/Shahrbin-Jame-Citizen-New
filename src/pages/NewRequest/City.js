import React from "react";
import useInstance from "../../hooks/useInstance";
import styles from "./styles.module.css";

const City = ({ onChange = (f) => f, goToNextStep = (f) => f }) => {
  // hooks
  const { currentInstance, instances, setAppInstance } = useInstance();

  //   functions
  const handleClick = (instance) => {
    onChange(instance, "city");
    goToNextStep();
  };

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
