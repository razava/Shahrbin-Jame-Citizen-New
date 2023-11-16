import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import useClick from "../../hooks/useClick";
import TextInput from "../TextInput/TextInput";
import useResize from "../../hooks/useResize";
import { AppStore } from "../../store/AppContext";
import { DNT } from "../../utils/functions";

const modalWrapper = document && document.getElementById("modal2");

const DatePicker = ({
  value = "",
  onChange,
  name,
  label,
  classNames = { wrapper: "", input: "", label: "", container: "" },
  isInDialog,
  id,
}) => {
  const calenderRef = useRef(null);
  const datePickerRef = useRef(null);
  const inputRef = useRef(null);

  const [calender, showCalender] = useClick({
    element: calenderRef,
    whitelists: [datePickerRef],
  });
  const [selectedDay, setSelectedDay] = useState(value);
  const [style, setStyle] = useState({});

  // window resize hook
  const { windowWidth, windowHeight } = useResize();

  const clearSelected = () => {
    setSelectedDay(null);
  };

  // functions
  const handleRegular = () => {
    const style = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      borderRadius: "1em",
      boxShadow: "0 3px 12px rgba(0, 0, 0, 0.2)",
      position: "absolute",
    };
    setStyle(style);
  };

  const handleInDialog = () => {
    const style = {
      position: "fixed",
      zIndex: 10000000,
      backgroundColor: "var(--white)",
      opacity: calender ? 1 : 0,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      overflowY: "auto",
      border: "1px solid var(--light)",
      boxShahdow: "0 0 10px rgba(0,0,0,0.1)",
      borderRadius: 10,
      transition: "opacity 0.3s, transform 0.3s",
    };
    const boundings = inputRef?.current?.getBoundingClientRect();
    if (boundings?.top > windowHeight - boundings?.bottom) {
      style.bottom = windowHeight - boundings?.bottom + boundings?.height;
    } else {
      style.top = boundings?.top + boundings?.height;
    }
    style.left = boundings?.left + (boundings?.width - 332) / 2;
    setStyle(style);
  };

  const handleChange = (obj) => {
    showCalender(false);
    const date = DNT.toGregorian(`${obj.year}/${obj.month}/${obj.day}`);
    setSelectedDay(date);
    onChange(new Date(date).toISOString(), name);
  };

  // effects
  useEffect(() => {
    if (isInDialog) {
      handleInDialog();
    } else {
      handleRegular();
    }
  }, [calenderRef.current, calender, windowWidth, windowHeight]);

  // renders
  const renderCalendar = () => {
    return (
      <div
        className={`calender ${calender ? "active" : ""}`}
        style={{ display: calender ? "block" : "none" }}
      >
        <div ref={datePickerRef} style={style}>
          <Calendar
            // value={DNT.toJson(selectedDay, "jalali")}
            onChange={handleChange}
            shouldHighlightWeekends
            locale={"fa"}
          />
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        ref={calenderRef}
        style={{ position: "relative" }}
        className={classNames.container}
      >
        <div ref={inputRef}>
          <TextInput
            value={DNT.toJalaliString(selectedDay, "YYYY/MM/DD")}
            classNames={classNames}
            // forwardInputRef={inputRef}
            editable={false}
            label={label}
            required={false}
            onClick={() => showCalender(!calender)}
            icon={selectedDay ? "fas fa-times" : ""}
            onIconClick={clearSelected}
            floatingLabel
          />
        </div>

        {renderCalendar()}
      </div>
    </>
  );
};

export default DatePicker;
