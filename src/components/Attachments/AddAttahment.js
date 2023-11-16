import React, { useState } from "react";
import { ERROR, FS } from "../../utils/functions";
import FileAttachment from "./FileAttachment";
import styles from "./styles.module.css";
import CameraAttachment from "./CameraAttachment";
import Attachment from "./Attachment";

const AddAttahment = ({ onChange = (f) => f, name = "" }) => {
  // states
  const [attachments, setAttachments] = useState([]);

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
    onChange(newAttachments, name);
  };

  const removeAttachment = (attachment) => {
    const newAttachments = attachments.filter((a) => a.id !== attachment.id);
    setAttachments(newAttachments);
    onChange(newAttachments, name);
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
  return (
    <>
      <section className={styles.attachmentMethods}>
        {renderFileAttachment()}
        {renderCameraAttachment()}
      </section>
      {renderAttachments()}
    </>
  );
};

export default AddAttahment;
