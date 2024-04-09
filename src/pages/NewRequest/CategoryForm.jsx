import React, { useState } from "react";
import TextInput from "../../components2/TextInput/TextInput";
import TextArea from "../../components2/TextArea/TextArea";
import RadioGroup from "../../components2/Radio/RadioGroup";
import Optional from "../../components2/FormEditor/Elements/Optional";
import CheckBoxGroup from "../../components2/CheckBox/CheckBoxGroup";
import Header from "../../components2/Header/Header";
import DropZone from "../../components2/FileDrop/DropZone";
import Message from "../../components2/Message/Message";

export default function CategoryForm({ data, onChange, requestOnChange }) {
  console.log(data.category.form.elements);
  let obj = {};
  const names = data.category.form.elements.map((item) => {
    if (item.elementType !== "message" && item.elementType !== "header" && item.elementType !== "dropzone") return;
  });
  const [values, setValues] = useState(obj);

  const { category } = data;
  const handleChange = (e, name) => {
    console.log(e, name);
    setValues({ ...values, [name]: e });
    if (Array.isArray(e) && e[0].hasOwnProperty("id")) {
      setValues({ ...values, [name]: e });
      requestOnChange(e, "attachments");
    } else {
      onChange({ ...values, [name]: e });
    }
  };

  const sortedElements = category?.form?.elements.sort(
    (a, b) => a.order - b.order
  );

  console.log(sortedElements);

  return (
    <div className="w-full flex flex-col gap-2">
      {sortedElements.map((item) => {
        const meta = JSON.parse(item.meta);
        if (item.elementType === "text") {
          return (
            <div
              style={{ order: item.order }}
              // className={` order-${item.order} `}
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
              style={{ order: item.order }}
              // className={` order-${item.order}`}
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
              style={{ order: item.order }}
              // className={` order-${item.order} `}
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
              style={{ order: item.order }}
              // className={` order-${item.order}`}
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
              style={{ order: item.order }}
              // className={` order-${item.order}`}
            >
              <CheckBoxGroup
                name={item.name}
                onChange={handleChange}
                defaultSelecteds={[]}
                {...meta.props}
              />
            </div>
          );
        } else if (item.elementType == "header") {
          return (
            <div
              style={{ order: item.order }}
              // className={` order-${item.order}`}
            >
              <Header {...meta.props} />
            </div>
          );
        } else if (item.elementType == "dropzone") {
          return (
            <div
              style={{ order: item.order }}
              className={` order-${item.order}`}
            >
              <DropZone
                onChange={(value) => handleChange(value, item.name)}
                {...meta.props}
              />
            </div>
          );
        } else if (item.elementType == "message") {
          return (
            <div
              style={{ order: item.order }}
              // className={` order-${item.order}`}
            >
              <Message {...meta.props} />
            </div>
          );
        }
      })}
    </div>
  );
}
