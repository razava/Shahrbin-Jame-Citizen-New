import React, { useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.css";
import useClick from "../../hooks/useClick";
import DropDownBody from "./DropDownBody";
import DropDownItem from "./DropDownItem";
import TextInput from "../TextInput/TextInput";
import DropDownToggle from "./DropDownToggle";

const DropDown = ({
  position = "bottom",
  scroll = false,
  scrollHeight = 120,
  classNames = {
    wrapper: "",
    toggle: "",
  },
  style = {
    wrapper: {},
    toggle: {},
  },
  renderToggle,
  onChange = (f) => f,
  animationType = "translatez",
  activator = "click",
  options = [],
  defaultSelecteds = [],
  single = true,
  name = "",
  inDialog = false,
  searchable = false,
  valueKey = "value",
  nameKey = "title",
  toggleProps = {},
  required = false,
  label = "",
}) => {
  //   refrences
  const wrapperRef = useRef(null);
  const toggleRef = useRef(null);
  const searchRef = useRef(null);

  // states
  const [data, setData] = useState(options);
  const [show, setShow] = useState(false);
  const [selecteds, setSelecteds] = useState(defaultSelecteds);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [searchText, setSearchText] = useState("");

  //   hooks
  const [isClicked, setIsClicked] = useClick({
    element: wrapperRef,
    whitelists: searchable ? [searchRef] : [],
  });

  //   effects
  useEffect(() => {
    if (activator === "click") {
      if (isClicked) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  }, [isClicked]);

  //   functions
  const handleOutsideClick = (e) => {
    console.log("clicked outside dropdown");
    if (!isClicked) setIsClicked(true);
  };

  const onMouseOver = () => {
    if (activator === "hover") {
      setShow(true);
    }
  };

  const onMouseLeave = () => {
    if (activator === "hover") {
      setShow(false);
    }
  };

  const handleChange = (selected) => {
    let newSelected;
    if (single) {
      newSelected = [selected];
      onChange(newSelected[0], name);
      setIsClicked(false);
    } else {
      const exists = selecteds.find((s) => s[valueKey] === selected[valueKey]);
      if (exists) {
        newSelected = selecteds.filter(
          (s) => s[valueKey] !== selected[valueKey]
        );
      } else {
        newSelected = [...selecteds, selected];
      }
      onChange(newSelected, name);
    }
    setSelecteds(newSelected);
  };

  const clear = () => {
    setSelecteds([]);
    onChange([], name);
  };

  const onSearch = (value) => {
    setSearchText(value);
    if (value === "") return setData(options);
    const newData = data.filter((d) => String(d[nameKey]).includes(value));
    setData(newData);
  };

  //   renders
  const renderToggleWrapper = () => {
    const selectedItems = options.filter((option) =>
      selecteds.find((s) => s[valueKey] === option[valueKey])
    );
    return (
      <div
        className={toggleClassName}
        data-toggle={true}
        ref={toggleRef}
        style={style.toggle}
        onClick={handleOutsideClick}
      >
        {renderToggle ? (
          renderToggle(selectedItems, clear, isClicked)
        ) : (
          <DropDownToggle
            selecteds={selectedItems}
            isOpen={isClicked}
            clear={clear}
            nameKey={nameKey}
            required={required}
            label={label}
            {...toggleProps}
          />
        )}
      </div>
    );
  };

  //   classNames
  const wrapperClassName = [
    styles.wrapper,
    show ? styles.show : "",
    classNames.wrapper,
  ].join(" ");

  const toggleClassName = [styles.toggle, classNames.toggle].join(" ");

  useEffect(() => {
    if (options.length > 0) setData(options);
  }, [options]);

  useEffect(() => {
    if (inDialog) {
      const style = {
        position: "fixed",
        zIndex: 10000,
      };
      const boundings = toggleRef.current.getBoundingClientRect();
      style.top = boundings?.top + boundings?.height;
      style.left = boundings?.right - boundings.width;
      style.width = boundings.width;
      setDropdownStyle(style);
    }
  }, []);

  useEffect(() => {
    if (defaultSelecteds) {
      setSelecteds(defaultSelecteds);
    }
  }, [defaultSelecteds.length]);

  // renders
  const renderSearchInput = () => {
    if (!searchable) return null;
    return (
      <div ref={searchRef}>
        <TextInput
          placeholder="جستجو..."
          value={searchText}
          onChange={onSearch}
          classNames={{
            input: styles.searchInput,
          }}
        />
      </div>
    );
  };

  const renderNoOptions = () => {
    return (
      <span className={styles.noOptions}>گزینه‌ای برای انتخاب وجود ندارد.</span>
    );
  };
  return (
    <>
      <section
        className={wrapperClassName}
        style={style.wrapper}
        // onClick={handleOutsideClick}
        ref={wrapperRef}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {renderToggleWrapper()}
        <DropDownBody
          position={position}
          scroll={scroll}
          scrollHeight={scrollHeight}
          classNames={classNames}
          animationType={animationType}
          toggler={toggleRef}
          style={dropdownStyle}
        >
          {renderSearchInput()}
          <div className={styles.options}>
            {data.map((option) => (
              <DropDownItem
                key={option.id}
                option={option}
                onClick={option.onClick ? option.onClick : handleChange}
                isSelected={
                  !!selecteds.find((s) => s[valueKey] === option[valueKey])
                }
                single={single}
                nameKey={nameKey}
                valueKey={valueKey}
              />
            ))}
          </div>
          {data.length === 0 && renderNoOptions()}
        </DropDownBody>
      </section>
    </>
  );
};

export default React.memo(DropDown);
