/* eslint-disable */
import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
/*
配置实例
{
    name: 'batch_id',
    label: '批次',
    type: 'self',
    props: {
        component: <ListSelectorBatch/>,
        showType: 'modal',
        onChange: (value, data) => {
            console.log(value, data);
        },
        renderContent: (value, data) => {
            console.log(value, data);
            return <div>{value}{value}{value}{value}{value}{value}</div>;
        },
    },
}
*
* */

/*
 * 搜索区组件链接其他自定义组件的适配器
 * 兼容上传文件、弹窗选择列表
 * 自定义搜索区，默认支持配置的字段类型是 antd 自带的一些表单组件
 * 有时候与遇到业务组件字段---选择一个弹窗中的数据，点击上传之后获取列表等复杂的字段
 * 这个时候可以自己写一个组件，把类型 type 设置为 antd 中没有的组件类型，比如：type:self ,那么在渲染搜索区的时候，
 * 就会使用这个适配器把自定义的组件进行包装
 * */
class listAdepter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      value: props.value || props.defaultValue || undefined,
    };
  }

  componentDidMount() {
    const { refInner = {} } = this.props;
    //可以在容器里面获取到传入的组件
    refInner.ref = this.childListSelectorBatch;
  }

  //显示组件
  show = () => {
    let { showType } = this.props;
    if (showType === "modal" && !this.childListSelectorBatch.show) {
      console.warn("模态框选择类型,必须提供show方法");
      return;
    }
    this.childListSelectorBatch.show();
  };
  clearVal = () => {
    this.setState(
      {
        value: undefined,
        data: undefined,
      },
      () => {
        this.onChange();
      }
    );
  };
  onOk = (data) => {
    if (data.label === undefined || data.value === undefined) {
      console.warn("选择的数据必须提供key:value,label");
      return;
    }
    this.setState(
      {
        value: data.label,
        data: data,
      },
      () => {
        this.onChange();
      }
    );
  };
  onChange = () => {
    let { onChange } = this.props;
    let { value, data } = this.state;
    onChange && onChange(data, value);
  };
  renderTrigger = () => {
    let {
      renderContent,
      allowClear,
      showContent = true,
      disabled = false,
    } = this.props;
    let { value, data } = this.state;
    let content = value;
    if (renderContent) {
      content = renderContent(value, data);
    }
    if (showContent) {
      return (
        <div onClick={!disabled && this.show} className="filed-content">
          <div className="filed-left">{content}</div>
          {!disabled && value && allowClear && (
            <div className="filed-right">
              <CloseCircleOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  this.clearVal();
                }}
              />
            </div>
          )}
        </div>
      );
    } else {
      return <div />;
    }
  };

  renderTargetComponent = (component) => {
    const { refInner = {} } = this.props;
    //可以在容器里面获取到传入的组件
    refInner.ref = this.childListSelectorBatch;
    let props = {
      ...this.props,
      onOk: this.onOk,
      ref: (_) => (this.childListSelectorBatch = _),
    };
    return React.cloneElement(component, { ...props });
  };

  render() {
    let { triggerType, component } = this.props;
    return (
      <div className={"list-adepter-wrap"}>
        {this.renderTrigger(triggerType)}
        {this.renderTargetComponent(component)}
      </div>
    );
  }
}

export default listAdepter;
