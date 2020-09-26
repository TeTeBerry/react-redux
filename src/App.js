import React, { useState } from "react";
import { Table, Button } from "antd";
import "./App.css";
import Child from "./Child";

const App = () => {
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "编辑",
      dataIndex: "operation",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
        </span>
      ),
    },
  ];

  const handleEdit = (record) => {
    setShowModal(true);
    setEdit(true);
    setData(record);
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Button onClick={() => handleAdd()}>add</Button>
      <Table columns={columns} dataSource={dataSource} />

      <Child edit={edit} showModal={showModal} record={data} />
    </div>
  );
};

export default App;