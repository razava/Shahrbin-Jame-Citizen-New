import React from "react";
import TextInput from "../TextInput/TextInput";
import styles from "./dropdown.module.css";

const DropDownToggle = ({
  label = "",
  floatingLabel = true,
  isOpen = false,
  selecteds = [],
  clear = (f) => f,
  nameKey = "",
  required = false,
  ...rest
}) => {
  // variables
  const icon =
    selecteds.length > 0 && !required
      ? "times"
      : isOpen
      ? "caret-up"
      : "caret-down";
  // functions
  const handleIconClick = (e) => {
    e.stopPropagation();
    if (icon === "times") return clear();

    return;
  };

  return (
    <>
      <TextInput
        editable={false}
        placeholder="انتخاب کنید"
        label={label}
        value={selecteds.map((s) => s[nameKey]).join(", ")}
        icon={icon}
        onIconClick={handleIconClick}
        floatingLabel={floatingLabel}
        classNames={{
          input: styles.dropdownToggle,
          wrapper: styles.dropdownToggleWrapper,
        }}
        {...rest}
      />
    </>
  );
};

export default DropDownToggle;
