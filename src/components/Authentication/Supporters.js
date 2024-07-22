import React from "react";
import styles from "./styles.module.css";
import fava from "../../assets/images/fava-yazd-logo.png";
import pishgaman from "../../assets/images/goroh-pishgaman-logo.png";
import shetab from "../../assets/images/shetab-logo.png";
import Municipality from "../../assets/images/Yazd-Municipality.png";

const Supporters = () => {
  // variables
  const logoStyles = {
    maxWidth: 52,
    width: "100%",
    height: "auto",
    flex: 1,
    margin: "0 8px",
  };
  //   ******
  const favaLogo = process.env.REACT_APP_APP_CITY === "yazd" && (
    <img src={fava} style={logoStyles} />
  );
  //   ******
  const municipalityLogo = process.env.REACT_APP_MUNICIPALITY_LOGO && (
    <img
      src={require(`../../assets/images/${process.env.REACT_APP_MUNICIPALITY_LOGO}`)}
      style={logoStyles}
    />
  );
  //   ******
  const shetabLogo = <img src={shetab} style={logoStyles} />;
  //   ******
  const MunicipalityLogo = <img src={Municipality} style={logoStyles} />;
  //   ******
  const pishgamanLogo = <img src={pishgaman} style={logoStyles} />;
  return (
    <>
      <section className={styles.supporters}>
        {favaLogo}
        {/* {municipalityLogo} */}
        {MunicipalityLogo}
        {shetabLogo}
        {pishgamanLogo}
      </section>
    </>
  );
};

export default Supporters;
