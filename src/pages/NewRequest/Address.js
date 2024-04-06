import React, { useEffect } from "react";
import Map from "../../components/Map/Map";

const Address = ({
  goToNextStep = (f) => f,
  onChange = (f) => f,
  value,
  city,
  values,
  deleteAttachmentStep,
  addAttachmentStep,
}) => {
  // functions
  const onSave = (address) => {
    console.log(address);
    onChange(address, "address");
    goToNextStep();
  };

  // variables
  const coords = {
    latitude: value.coordinates.latitude || city?.latitude,
    longitude: value.coordinates.longitude || city?.longitude,
  };

  useEffect(() => {
    const hasAttachment = values?.category?.form?.elements.find(
      (item) => item.elementType == "dropzone"
    );
    if (hasAttachment) {
      deleteAttachmentStep();
    } else {
      addAttachmentStep();
    }
  }, []);

  return (
    <>
      <Map
        containerStyle={{ flex: 1, borderRadius: 20 }}
        onSave={onSave}
        coords={coords}
        address={value.details}
        onChange={onChange}
      />
    </>
  );
};

export default Address;
