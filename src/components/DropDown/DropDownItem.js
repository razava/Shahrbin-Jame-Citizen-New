import React from "react";
import CheckBox from "../CheckBox/CheckBox";
import Icon from "../Icon/Icon";
import styles from "./dropdown.module.css";

const DropDownItem = ({
  option = {},
  onClick = (f) => f,
  classNames = {
    dropdownitem: "",
    title: "",
    icon: "",
  },
  isSelected,
  single,
  nameKey = "",
  valueKey = "",
}) => {
  // functions
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(option);
  };

  // classNames
  const wrapperClassName = [
    styles.dropdownitem,
    isSelected ? styles.selected : "",
    !single ? styles.multiChoice : "",
    classNames.dropdownitem,
  ].join(" ");
  const titleClassName = [styles.dropdownitemTitle, classNames.title].join(" ");
  const iconClassName = [styles.dropdownitemIcon, classNames.icon].join(" ");
  return (
    <div className={wrapperClassName} onClick={handleClick}>
      {!single && <CheckBox checked={isSelected} />}
      <span className={titleClassName}>{option[nameKey]}</span>
      {option.icon && <Icon name={option.icon} className={iconClassName} />}
      {isSelected && single && (
        <Icon name={"check"} className={styles.checkIcon} />
      )}
    </div>
  );
};

export default DropDownItem;
