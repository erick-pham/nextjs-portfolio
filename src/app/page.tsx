import { Row, Col } from "antd";

import * as React from "react";
const style: React.CSSProperties = { background: "#0092ff", padding: "12px 0" };

const HomePage: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
