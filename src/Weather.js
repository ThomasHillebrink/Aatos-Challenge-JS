import "./Weather.css";
import React, { useEffect } from "react";
import { Typography, Menu, Dropdown, Divider  } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { WeatherDataSection } from "./WeatherDataSection";
import { DatePicker } from 'antd';

const getWeatherFromApi = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    const weather = data.weather[0]; 
    return weather;
  };



const Weather = () => {

    const [weatherData, setWeatherData] = React.useState({});
    const [city, setCity] = React.useState("Helsinki");
  
    
    useEffect(() => {
      async function fetchData() {
        const response = await getWeatherFromApi();
        console.log(response);
        
        setWeatherData(response)
      }
      fetchData();
    }, []); 
  
    const handleClick = (key) => {

      setCity(key)
  
      
  
    }
  
    const menu = (
      <Menu onClick={handleClick}>
        <Menu.Item key="Helsinki">Helsinki</Menu.Item>
        <Menu.Item key="Tampere">Tampere</Menu.Item>
        <Menu.Item key="Turku">Turku</Menu.Item>
        <Menu.Item key="Oulu">Oulu</Menu.Item>
      </Menu>
    );
  
  
    if (!weatherData) {
      return <p>No data</p>;
    }
    return (
      <div>
      <Dropdown overlay={menu}  trigger={["click"]}>
      <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        Select City <DownOutlined />
      </div>
      </Dropdown>
      <Divider />
      <Typography.Title>Current Weather for: {city} </Typography.Title>
      <WeatherDataSection city={city} weatherData={weatherData} />
      </div>
    );
  };
  
  export default Weather;