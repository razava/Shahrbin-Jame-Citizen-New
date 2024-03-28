import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import ph from "../../assets/images/ph.png";
import Icon from "../Icon/Icon";
import { URI } from "../../utils/functions";
import { AppStore } from "../../store/AppContext";

const Avatar = ({
  source = "",
  editable = false,
  name = "",
  size = 4,
  onChange = (f) => f,
}) => {
  // refs
  const inputRef = useRef();

  // store
  const [store] = useContext(AppStore);

  // states
  const [imageSource, setImageSource] = useState(source);

  // functions
  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSource(reader.result);
    };
    reader.readAsDataURL(file);
    onChange(file, name);
  };

  const openFileSystem = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    const imageSource =
      source || store.initialData.user?.avatar
        ? URI.createMediaUri(store.initialData.user?.avatar?.url)
        : undefined;

    setImageSource(imageSource);
  }, [source, store.initialData.user.avatar]);
  console.log(imageSource);
  return (
    <>
      <figure className={styles.avatar}>
        <img
          src={imageSource || ph}
          style={{
            width: size * 25,
            height: size * 25,
          }}
        />
        {editable && (
          <Icon
            name="camera"
            className={styles.avatarIcon}
            onClick={openFileSystem}
          />
        )}
      </figure>
      <input
        ref={inputRef}
        type={"file"}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
};

export default Avatar;
