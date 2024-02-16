import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function ComplaintModal() {
  const [open, setOpen] = useState(true);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="">
      {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Modal open={open} onClose={onCloseModal} center>
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>توجه!</h1>
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          این صفحه برای ثبت شکایات از عملکرد شهرداری است.
        </h2>
        <h3
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          برای ثبت درخواست های شهرداری از گزینه ثبت درخواست وارد شوید.
        </h3>
      </Modal>
    </div>
  );
}
