import React from "react";
import TextInput from "../../components2/TextInput/TextInput";
import TextArea from "../../components2/TextArea/TextArea";
import RadioGroup from "../../components2/Radio/RadioGroup";
import Optional from "../../components2/FormEditor/Elements/Optional";
import CheckBoxGroup from "../../components2/CheckBox/CheckBoxGroup";
import Header from "../../components2/Header/Header";
import DropZone from "../../components2/FileDrop/DropZone";
import Message from "../../components2/Message/Message";

export default function CategoryForm({ data }) {
  console.log(data);
  const { category } = data;
  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <div className=" !mr-10 !bg-red-300">
      {category?.form?.elements.map((item) => {
        const meta = JSON.parse(item.meta);
        if (item.elementType === "text") {
          return <TextInput onChange={handleChange} {...meta.props} />;
        } else if (item.elementType == "select") {
          return <Optional handleChange2={handleChange} field={meta} />;
        } else if (item.elementType == "textarea") {
          return <TextArea {...meta.props} />;
        } else if (item.elementType == "radio") {
          return <RadioGroup {...meta.props} />;
        } else if (item.elementType == "checkbox") {
          return <CheckBoxGroup {...meta.props} />;
        } else if (item.elementType == "header") {
          return <Header {...meta.props} />;
        } else if (item.elementType == "dropzone") {
          return <DropZone {...meta.props} />;
        } else if (item.elementType == "message") {
          return <Message {...meta.props} />;
        }
      })}
    </div>
  );
}
