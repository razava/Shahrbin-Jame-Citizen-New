import React from "react";
import { CN, STR } from "../../utils/functions";
import Radio from "../../components/Radio/Radio";
import styles from "./styles.module.css";

const SelectivePoll = ({
  disabled = false,
  multiple = false,
  choices = [],
  selecteds = [],
  onChange = (f) => f,
}) => {
  // functions
  const handleClick = (choice) => {
    if (disabled) return;
    const newSelecteds = selecteds.slice();
    const exists = newSelecteds.find((s) => s.id === choice.id);
    if (multiple) {
      onChange(
        exists
          ? newSelecteds.filter((s) => s.id !== choice.id)
          : [...newSelecteds, choice]
      );
    } else {
      onChange(exists ? [] : [choice]);
    }
  };

  return (
    <>
      <ul className={styles.pollChoices}>
        {choices.map((choice) => {
          const isSelected = !!selecteds.find((s) => s.id === choice.id);
          return (
            <li
              className={CN.join(
                styles.pollChoice,
                isSelected ? styles.selected : ""
              )}
              onClick={() => handleClick(choice)}
            >
              <Radio checked={isSelected} />
              <p
                dangerouslySetInnerHTML={{ __html: STR.parseHtml(choice.text) }}
              ></p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SelectivePoll;
