import React from "react";
import Map from "../../components/Map/Map";

const Address = ({
  goToNextStep = (f) => f,
  onChange = (f) => f,
  value,
  city,
}) => {
  // functions
  const onSave = (address) => {
    onChange(address, "address");
    goToNextStep();
  };

  // variables
  const coords = {
    latitude: value.coordinates.latitude || city?.latitude,
    longitude: value.coordinates.longitude || city?.longitude,
  };

  return (
    <>
      <Map
        containerStyle={{ flex: 1, borderRadius: 20 }}
        onSave={onSave}
        coords={coords}
        address={value.details}
      />
    </>
  );
};

export default Address;
