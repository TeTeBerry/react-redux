/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Space,
  Input,
  Select,
  DatePicker,
  Switch,
  InputNumber,
  Checkbox,
  Cascader,
  Rate,
  Radio,
  TreeSelect,
  TimePicker,
} from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
import ListAdepter from "./list-adepter";

const comIdReamCom = {
  Input: Input,
  Select: Select,
  TimePicker: TimePicker,
  DatePicker: DatePicker,
  Switch: Switch,
  InputNumber: InputNumber,
  Checkbox: Checkbox,
  Cascader: Cascader,
  Rate: Rate,
  Radio: Radio,
  TreeSelect: TreeSelect,
  RangePicker: RangePicker,
  TextArea: TextArea,
  CheckboxGroup: Checkbox.Group,
  RadioGroup: Radio.Group,
  RadioGroupButton: Radio.Group,
};

const formItemLayoutDefault = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 18 } },
};
const CompositeSearch = ({
  loading = false,
  formItemLayout = formItemLayoutDefault,
  onSearch = () => {},
  onChange = () => {},
  onReset = null,
  maxShow = 1000,
  itemList = [],
  columns = 3,
  gutter = 0,
  initialValues = {},
  mount = () => {},
  showBtns = true,
  type = "search",
  formPorps = {},
}) => {
  const [expand, setExpand] = useState(false);
  const [itemListInner, setItemListInner] = useState([...itemList]);
  const [form] = Form.useForm();
  mount(form);
  const getFields = () => {
    let innerItemList,
      hideList = [...itemListInner],
      showList;
    if (itemListInner.length > maxShow) {
      showList = hideList.splice(0, maxShow);
    } else {
      showList = [...hideList];
    }
    if (expand) {
      innerItemList = [...itemListInner];
    } else {
      innerItemList = [...showList];
    }
    let children = innerItemList.map((item, i) => {
      let columnsLength = item.columnsLength || 1;
      if (item.showIf) {
        let _showIf = item.showIf();
        if (!_showIf) {
          return <div />;
        }
      }
      return (
        <Col span={(24 * columnsLength) / columns} key={i}>
          <Form.Item
            {...formItemLayout}
            {...item.formItemLayout}
            name={item.name}
            label={item.label}
            rules={item.rules}
            {...item.FormItem}
          >
            {getComponentByType(item)}
          </Form.Item>
        </Col>
      );
    });
    return children;
  };
  /*
   * 根据传入的字段配置
   * 渲染对应的组件
   * 主要是根据type渲染，针对自定义的组件有两种是渲染开发者自己传入的组件
   * 在 antd4.4 之前，通过表单是无法获取表单中某一个字段组件的实例的，这里是做兼容可以获取字段组件的实例
   * */
  const getComponentByType = ({ type, props, children, component, name }) => {
    /*
     * antd 表单组件的特殊处理
     * */
    if (type === "RadioGroupButton") {
      if (!name) {
        throw new Error("必须配置字段名 name");
      }
      let { options = [] } = props;
      return React.createElement(
        comIdReamCom[type],
        {
          ...props,
          options: undefined, // 默认的渲染样式不是 Radio.Button
          key: name,
          onChange: (e) => {
            vChange(e);
            props && props.onChange && props.onChange(e);
          },
        },
        (options || []).map((item) => (
          <Radio.Button value={item.value}>{item.label}</Radio.Button>
        ))
      );
    }
    /*
     * 主要是渲染 antd 封装的表单组件
     * */
    if (comIdReamCom[type]) {
      if (!name) {
        throw new Error("必须配置字段名 name");
      }
      return React.createElement(
        comIdReamCom[type],
        {
          ...props,
          key: name,
          onChange: (e) => {
            // 值改变内部拦截，监听方便控制渲染
            vChange(e);
            props && props.onChange && props.onChange(e);
          },
        },
        children
      );
    }
    /*
     * 渲染自定义组件
     * 不能获取到组件的实例 ref
     * */
    if (type === "formCom") {
      if (!component) {
        throw new Error("必须配置组件 component");
      }
      return React.cloneElement(
        component,
        {
          ...props,
          key: name,
          onChange: (e) => {
            // 值改变内部拦截，监听方便控制渲染
            vChange(e);
            props && props.onChange && props.onChange(e);
          },
        },
        children
      );
    }
    /*
     * 渲染自定义组件
     * 可以获取到组件的实例, 可以调用组件的内部得方法
     * 如果组件需要 ListAdepter 来触发，则必须提供 show 方法, 不能是函数组件否则无法获取组件实例
     * */
    return React.cloneElement(
      <ListAdepter />,
      {
        ...props,
        key: name,
        onChange: (e) => {
          // 值改变内部拦截，监听方便控制渲染
          vChange(e);
          props && props.onChange && props.onChange(e);
        },
      },
      children
    );
  };

  /*
   * 值改变
   * 渲染表单
   * 默认情况下，有字段联动控制的情况下也不会渲染其他字段，但是这样就无法控制联动关系了
   * 在antdv3的版本中，只要值改变，表单就会重新渲染
   * 但是在antdv4中，为了更好的性能，表单改变一个字段，其他字段不会渲染，这样表单有联动关系就比较难办了
   * 绝大多数场景表单字段不会太大，不会有性能问题
   * */
  const vChange = () => {
    setItemListInner([...itemList]);
  };
  useEffect(() => {
    setItemListInner([...itemList]);
  }, [itemList.length]);
  useEffect(() => {
    setItemListInner([...itemList]);
  }, [itemList]);
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSearch(values);
      })
      .catch(() => {});
  };
  const reset = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    } else {
      onSearch();
    }
  };

  const renderSearch = () => {
    if (showBtns) {
      return (
        <div className="f-btns">
          <Space>
            {itemListInner.length > maxShow && (
              <Button
                type="link"
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                {expand ? <UpOutlined /> : <DownOutlined />} 更多
              </Button>
            )}
            {onReset && (
              <Button onClick={reset} loading={loading}>
                重置
              </Button>
            )}
            <Button type="primary" loading={loading} onClick={onSubmit}>
              查询
            </Button>
          </Space>
        </div>
      );
    } else {
      return <div />;
    }
  };
  const renderForm = () => {
    if (showBtns) {
      let marginLeft = (formItemLayout.labelCol.sm.span * 100) / 24 + "%";
      return (
        <div className="f-form-btns" style={{ marginLeft }}>
          <Space>
            <Button type="primary" onClick={onSubmit} loading={loading}>
              提交
            </Button>
            {onReset && (
              <Button onClick={reset} loading={loading}>
                取消
              </Button>
            )}
          </Space>
        </div>
      );
    } else {
      return <div />;
    }
  };
  return (
    <div className="composite-search-wrap">
      <Form
        {...formPorps}
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={initialValues}
        onValuesChange={onChange}
      >
        <Row gutter={gutter}>{getFields()}</Row>
        {type === "search" && renderSearch()}
        {type === "form" && renderForm()}
      </Form>
    </div>
  );
};

export default CompositeSearch;
