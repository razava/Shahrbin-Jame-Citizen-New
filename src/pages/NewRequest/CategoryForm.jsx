import React, { useState } from "react";
import TextInput from "../../components2/TextInput/TextInput";
import TextArea from "../../components2/TextArea/TextArea";
import RadioGroup from "../../components2/Radio/RadioGroup";
import Optional from "../../components2/FormEditor/Elements/Optional";
import CheckBoxGroup from "../../components2/CheckBox/CheckBoxGroup";
import Header from "../../components2/Header/Header";
import DropZone from "../../components2/FileDrop/DropZone";
import Message from "../../components2/Message/Message";

export default function CategoryForm({ data, onChange , requestOnChange }) {
  console.log(data.category.form.elements);
  let obj = {};
  const names = data.category.form.elements.map((item) => {
    if (item.elementType !== "message" || item.elementType !== "header")
      obj[item.name] = "";
  });
  const [values, setValues] = useState(obj);
  console.log(obj);
  console.log(values);
  const { category } = data;
  const handleChange = (e, name) => {
    console.log(e, name);
    setValues({ ...values, [name]: e });
    if (name == "dropzone") {
      console.log("44444");
      requestOnChange(e, "attachments");
    } else {
      onChange({ ...values, [name]: e });
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {category?.form?.elements.map((item) => {
        const meta = JSON.parse(item.meta);
        if (item.elementType === "text") {
          return (
            <div
              //   style={{ order: item.order }}
              className={` order-${item.order}`}
            >
              <TextInput
                name={item.name}
                onChange={handleChange}
                {...meta.props}
              />
            </div>
          );
        } else if (item.elementType == "select") {
          return (
            <div
              //   style={{ order: item.order }}
              className={` order-${item.order}`}
            >
              <Optional
                handleChange2={handleChange}
                name={item.name}
                field={meta}
              />
            </div>
          );
        } else if (item.elementType == "textarea") {
          return (
            <div
              //   style={{ order: item.order }}
              className={` order-${item.order}`}
            >
              <TextArea
                name={item.name}
                onChange={handleChange}
                {...meta.props}
              />
            </div>
          );
        } else if (item.elementType == "radio") {
          return (
            <div
              //   style={{ order: item.order }}
              className={` order-${item.order}`}
            >
              <RadioGroup
                onChange={(value) => handleChange(value, item.name)}
                {...meta.props}
              />
            </div>
          );
        } else if (item.elementType == "checkbox") {
          return (
            <div
              //   style={{ order: item.order }}
              className={` order-${item.order}`}
            >
              <CheckBoxGroup
                name={item.name}
                onChange={handleChange}
                {...meta.props}
              />
            </div>
          );
        } else if (item.elementType == "header") {
          return (
            <div
              //   style={{ order: item.order }}
              className={` order-${item.order}`}
            >
              <Header {...meta.props} />
            </div>
          );
        } else if (item.elementType == "dropzone") {
          return (
            <div className={` order-${item.order}`}>
              <DropZone
                onChange={(value) => handleChange(value, "dropzone")}
                {...meta.props}
              />
            </div>
          );
        } else if (item.elementType == "message") {
          return (
            <div className={` order-${item.order}`}>
              <Message {...meta.props} />
            </div>
          );
        }
      })}
    </div>
  );
}
