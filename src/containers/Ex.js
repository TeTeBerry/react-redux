/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Col, Row } from "antd";
import "./App.css";

const source = [
  {
    name: 12,
    value: 21,
  },
  {
    name: 13,
    value: 22,
  },
  {
    name: 14,
    value: 23,
  },
  {
    name: 15,
    value: 24,
  },
];

const Ex = ({ dispatch }) => {
  const [data, setData] = useState([source]);

  const todoItems = data.map((todo, index) => (
    // 只有在没有确定的 id 时使用
    <li key={index}>{todo.name}</li>
  ));

  return (
    <div className="site-card-wrapper">
      {/* <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card bordered={false}></Card>
        </Col>
      </Row> */}
      {todoItems}
    </div>
  );
};

export default connect()(Ex);
