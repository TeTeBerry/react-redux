import React, {
  useState,
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { Modal } from "antd";
import CompositeSearch from "./components/CompositeSearch";
import "./App.css";
import { set } from "lodash";

let Child = (props, ref) => {
  const [formData, setFormData] = useState(false);
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [itemList, setItemList] = useState([
    {
      name: "address",
      label: "地址",
      type: "Input",
      props: {},
    },
    {
      name: "name",
      label: "名字",
      type: "Input",
      props: {},
    },
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

  const show = (newVal) => {
    setVisible(true);
    setData(newVal);

    setFormData(true);

    // formChange.setFieldsValue(data.landForm);
  };

  useImperativeHandle(ref, () => {
    return {
      show: show,
    };
  });

  useEffect(() => {}, [initialValues]);

  const handleOk = (data) => {
    console.log(data);
    reset();
  };

  const formChange = (form) => {
    if (formData) {
      form.setFieldsValue(data.landForm);
    }
  };

  const handleChange = (value) => {
    setData({
      ...value,
    });
  };

  const reset = () => {
    setVisible(false);
  };

  return (
    <div className="App">
      <Modal
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => reset()}
        footer={null}
      >
        <CompositeSearch
          onChange={handleChange}
          mount={(form) => formChange(form)}
          // showBtns={false}
          initialValues={initialValues}
          itemList={itemList}
          onSearch={(data) => handleOk(data)}
          type="form"
          onReset={() => reset()}
        />
      </Modal>
    </div>
  );
};

Child = forwardRef(Child);

export default Child;
