import React from "react";
import useBottomSheet from "../../hooks/useBottomSheet";
import Icon from "../Icon/Icon";
import RequestProcess from "./RequestProcess";
import styles from "./styles.module.css";

const RequestProcessIcon = ({ logs=[], keys }) => {
  //   hooks
  const { open } = useBottomSheet();

  // variables
  const style = {
    maxWidth: 500,
    width: "100%",
  };

  //   functions
  const onIconClick = (e) => {
    e.stopPropagation();
    open({
      style,
      renderComponent: () => <RequestProcess history={logs} keys={keys} />,
    });
  };

  return (
    <>
      <div className={styles.requestCardProcess} onClick={onIconClick}>
        <Icon name="stream" className={styles.RequestCardProcessIcon} />
        <span>مشاهده روند بررسی</span>
      </div>
    </>
  );
};

export default RequestProcessIcon;
