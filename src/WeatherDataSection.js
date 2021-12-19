import React from "react";
import { Typography, Row, Col } from "antd";

export const WeatherDataSection = ({ weatherData, city }) => {

  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  return (
    <div>
      <Row>
        <Col span={12}>
          <img src={iconUrl} className="Weather-logo" alt="logo" />
        </Col>

        <Col span={12}>
            <h3>{city}</h3>
          <Typography.Title level={2}>{weatherData.main}</Typography.Title>
          <Typography.Text>{weatherData.description}</Typography.Text>
        </Col>
      </Row>
    </div>
  );
};
