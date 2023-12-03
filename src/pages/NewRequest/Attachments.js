import React, { useState } from "react";
import Attachment from "../../components/Attachments/Attachment";
import CameraAttachment from "../../components/Attachments/CameraAttachment";
import FileAttachment from "../../components/Attachments/FileAttachment";
import Button from "../../components/Button/Button";
import { DS, ERROR, FS } from "../../utils/functions";
import styles from "./styles.module.css";
import Uploader from "../../components/Uploader/Uploader";
import { api } from "../../services/http";
import { contentTypes, httpMethods } from "../../utils/variables";
import Loader from "../../components/Loader/Loader";

const Attachments = ({
  goToNextStep = (f) => f,
  onChange = (f) => f,
  value,
}) => {
  // states
  const [attachments, setAttachments] = useState(value);
  const [loading, setLoading] = useState(false);

  // functions
  const handleFileSelection = async (file) => {
    // validations
    setLoading(true)
    const newFiles = [...attachments.map((a) => a.file), file];
    const isExtensionOkay = Array.from(newFiles).every((file) =>
      FS.checkExtension(file.name)
    );
    if (!isExtensionOkay) return ERROR.extension();
    const isSizeOkay = FS.checkOverlAllSize(newFiles);
    if (!isSizeOkay) return ERROR.size();
    console.log(file);
    const headers = {
      "Content-Type": contentTypes.formData,
    };
    let fileId
    try {
      const { data, success } = await api.Files({
        headers,
        payload: DS.toFormData({ File: file, AttachmentType: 1 }),
        method: httpMethods.post,
        showMessageOnError: false,
        isPerInstance: false,
      });
      if (success) {
        setLoading(false)
        fileId = data.id
        console.log(fileId);
        // dispatch({ type: appActions.SET_INSTANCES, payload: data });
        // setAppInstance(getCurrentInstance(data));
        // setIsSuccess(true);
      }
    } catch (err) {
      setLoading(false);
      // setIsSuccess(false);
    }
    const newAttachments = [...attachments, { id: fileId, file }];
    console.log(newAttachments);
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
      <Button className={styles.stepButton} disabled={loading} onClick={goToNextStep}>
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
        {/* <Uploader /> */}
        {renderAttachments()}
        {loading && <Loader />}
      </div>
      {renderAttachmentButton()}
    </>
  );
};

export default Attachments;
