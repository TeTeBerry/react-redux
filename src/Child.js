import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import CompositeSearch from "./components/CompositeSearch";
import "./App.css";

const Child = (props) => {
  const [visible, setVisible] = useState(false);
  const [ok, setOk] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [itemList, setItemList] = useState([
    {
      name: "age",
      label: "年龄",
      type: "Select",
      props: {
        options: [
          { label: "32岁", value: 32 },
          { label: "42岁", value: 42 },
        ],
      },
    },
  ]);

  useEffect(() => {
    setVisible(props.showModal);
    if (props.edit) {
      setInitialValues({ age: props.record.age });
    }
  }, [props.edit, props.record, props.showModal]);

  const handleOk = () => {
    setOk(true);
  };

  const cancle = () => {
    setVisible(false);
  };

  const formValue = (form) => {
    if (ok) {
      let forms = form.getFieldsValue();
      console.log(forms);
    }
  };

  return (
    <div className="App">
      <Modal visible={visible} onOk={handleOk} onCancel={() => cancle()}>
        <CompositeSearch
          mount={(form) => formValue(form)}
          showBtns={false}
          itemList={itemList}
          onReset={cancle}
          initialValues={initialValues}
        />
      </Modal>
    </div>
  );
};

export default Child;
