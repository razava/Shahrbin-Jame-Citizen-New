import React, { useEffect, useState } from "react";
import { DS, FS, URI } from "../../utils/functions";
import Icon from "../Icon/Icon";
import styles from "./styles.module.css";

const Attachment = ({ attachment = {}, onRemove = (f) => f }) => {
  // states
  const [source, setSource] = useState();

  // functions
  const getAttachmentSource = (attachment) => {
    const isImage = URI.isImage(attachment.name);
    if (isImage) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setSource(fileReader.result);
      };
      fileReader.readAsDataURL(attachment);
    } else {
      setSource(FS.getPlaceHolder(attachment.name));
    }
  };

  //   effects
  useEffect(() => {
    getAttachmentSource(attachment.file);
  }, []);
  return (
    <>
      <div className={styles.attachment}>
        <img src={source} className={styles.attachmentImage} />
        <div className={styles.attachmentDetails}>
          <p>{attachment.file.name}</p>
          <p>kb {DS.tousandSeprate(attachment.file.size)}</p>
        </div>

        <Icon
          name="trash-alt"
          className={styles.attachmentDeleteIcon}
          onClick={() => onRemove(attachment)}
        />
      </div>
    </>
  );
};

export default Attachment;
