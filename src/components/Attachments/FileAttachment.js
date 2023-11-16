import React, { useRef } from "react";

const FileAttachment = ({
  children,
  multiple = false,
  onChange = (f) => f,
}) => {
  //   refs
  const inputRef = useRef(null);

  //   functions
  const handleFileSelection = (e) => {
    const files = e.target.files;
    if (multiple) {
      onChange(files);
    } else {
      onChange(files[0]);
    }
  };

  const openFileBrowse = () => {
    if (inputRef.current) inputRef.current.click();
  };
  return (
    <>
      <input
        type={"file"}
        ref={inputRef}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={handleFileSelection}
      />
      {children({ openFileBrowse })}
    </>
  );
};

export default FileAttachment;
