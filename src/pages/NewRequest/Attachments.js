import React, { useState } from "react";
import Attachment from "../../components/Attachments/Attachment";
import CameraAttachment from "../../components/Attachments/CameraAttachment";
import FileAttachment from "../../components/Attachments/FileAttachment";
import Button from "../../components/Button/Button";
import { ERROR, FS } from "../../utils/functions";
import styles from "./styles.module.css";

const Attachments = ({
  goToNextStep = (f) => f,
  onChange = (f) => f,
  value,
}) => {
  // states
  const [attachments, setAttachments] = useState(value);

  // functions
  const handleFileSelection = (file) => {
    // validations
    const newFiles = [...attachments.map((a) => a.file), file];
    const isExtensionOkay = Array.from(newFiles).every((file) =>
      FS.checkExtension(file.name)
    );
    if (!isExtensionOkay) return ERROR.extension();
    const isSizeOkay = FS.checkOverlAllSize(newFiles);
    if (!isSizeOkay) return ERROR.size();

    const newAttachments = [...attachments, { id: new Date().getTime(), file }];
    setAttachments(newAttachments);
    onChange(newAttachments, "attachments");
  };

  const removeAttachment = (attachment) => {
    const newAttachments = attachments.filter((a) => a.id !== attachment.id);
    setAttachments(newAttachments);
    onChange(newAttachments, "attachments");
  };

  // renders
  const renderFileAttachment = () => {
    return (
      <FileAttachment onChange={handleFileSelection}>
        {({ openFileBrowse = (f) => f }) => (
          <section className={styles.attachmentMethod} onClick={openFileBrowse}>
            <span className={styles.attachmentMethodIcon}>
              <i className="fas fa-upload"></i>
            </span>
            <span className={styles.attachmentMethodTitle}>افزودن فایل</span>
          </section>
        )}
      </FileAttachment>
    );
  };

  const renderCameraAttachment = () => {
    return (
      <CameraAttachment onChange={handleFileSelection}>
        {({ openCamera = (f) => f }) => (
          <section className={styles.attachmentMethod} onClick={openCamera}>
            <span className={styles.attachmentMethodIcon}>
              <i className="fas fa-camera"></i>
            </span>
            <span className={styles.attachmentMethodTitle}>دوربین</span>
          </section>
        )}
      </CameraAttachment>
    );
  };

  const renderAttachments = () => {
    return (
      <section className={styles.attachments}>
        {attachments.map((attachment) => (
          <Attachment
            key={attachment.id}
            attachment={attachment}
            onRemove={removeAttachment}
          />
        ))}
      </section>
    );
  };

  const renderAttachmentButton = () => {
    return (
      <Button className={styles.stepButton} onClick={goToNextStep}>
        ادامه
      </Button>
    );
  };
  return (
    <>
      <div className={styles.attachmentsWrapper}>
        <section className={styles.attachmentMethods}>
          {renderFileAttachment()}
          {renderCameraAttachment()}
        </section>
        {renderAttachments()}
      </div>
      {renderAttachmentButton()}
    </>
  );
};

export default Attachments;
