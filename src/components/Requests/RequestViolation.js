import React from "react";
import useBottomSheet from "../../hooks/useBottomSheet";
import Icon from "../Icon/Icon";
import RequestViolations from "./RequestViolations";
import styles from "./styles.module.css";

const RequestViolation = ({ request }) => {
  //   hooks
  const { open } = useBottomSheet();

  //   variables
  const style = {
    maxWidth: 700,
    width: "100%",
    minHeight: 75,
  };

  //   functions
  const onIconClick = (e) => {
    e.stopPropagation();
    open({
      style,
      renderComponent: () => <RequestViolations request={request} />,
    });
  };

  return (
    <>
      <Icon
        name="flag"
        type="far"
        className={styles.RequestCardActionIcon}
        onClick={onIconClick}
      />
    </>
  );
};

export default RequestViolation;
