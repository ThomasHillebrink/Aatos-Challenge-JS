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

  const getWeatherForecast = async (city) => {
    const getLatLong = () => {
      switch (city) {
        case "Helsinki":
          return { lat: 60.19, lon: 24.94 };
        case "Tampere":
          return { lat: 61.5, lon: 23.79 };
        case "Turku":
          return { lat: 60.45, lon: 22.27 };
        case "Oulu":
          return { lat: 65.01, lon: 25.47 };
        default:
          throw new Error("Unknown city");
      }
    };
    const { lat, lon } = getLatLong();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    const dailyForecast = data.daily;
    console.log(dailyForecast[0].weather[0]);
    return dailyForecast;
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
  
    const handleClick = ({key}) => {

      setCity(key)
      async function fetchData() {
        const response = await getWeatherForecast(key);
        console.log(response[0].weather[0]);
        
        setWeatherData(response[0].weather[0])
      }
      fetchData();
    //   console.log(key)
    //   console.log(getWeatherForecast(key))
    //   setWeatherData(getWeatherForecast(key))
  
      
  
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
      <Typography.Title>Current Weather </Typography.Title>
      <WeatherDataSection city={city} weatherData={weatherData} />
      </div>
    );
  };
  
  export default Weather;