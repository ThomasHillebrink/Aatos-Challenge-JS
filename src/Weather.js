import "./Weather.css";
import React, { useEffect } from "react";
import { Typography, Menu, Dropdown, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { WeatherDataSection } from "./WeatherDataSection";
import { SunriseSunsetSection } from "./SunriseSunsetSection";
import { WeatherForecast } from "./WeatherForecast";
import { format, intervalToDuration } from "date-fns";

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
  return dailyForecast;
};

const Weather = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [city, setCity] = React.useState("Helsinki");

  const [SunRise, setSunRise] = React.useState();
  const [SunSet, setSunSet] = React.useState();
  const [SunTime, setSunTime] = React.useState({});

  const [AverageTemp, setAverageTemp] = React.useState();
  const [MinTemp, setMinTemp] = React.useState();
  const [MaxTemp, setMaxTemp] = React.useState();

  useEffect(() => {
    async function fetchData() {
      const Weatherresponse = await getWeatherFromApi();
      const DayResponse = await getWeatherForecast("Helsinki");

      CalculateSunTimes(DayResponse);
      CaluclateTemperatures(DayResponse);

      setWeatherData(Weatherresponse);
    }
    fetchData();
  }, []);

  const CalculateSunTimes = (DayResponse) => {
    const SunRise = DayResponse[0].sunrise * 1000;
    setSunRise(format(SunRise, "HH:mm"));

    const SunSet = DayResponse[0].sunset * 1000;
    setSunSet(format(SunSet, "HH:mm"));

    setSunTime(
      intervalToDuration({
        start: new Date(SunRise),
        end: new Date(SunSet),
      })
    );
  };

  const CaluclateTemperatures = (DayResponse) => {
    const TemperaturesArray = DayResponse.map((day) => {
      return day.temp.day;
    });

    const TemperaturesAvg =
      TemperaturesArray.reduce((a, b) => a + b, 0) / TemperaturesArray.length;
    setAverageTemp(TemperaturesAvg.toFixed(1));

    const TemperaturesMin = Math.min(...TemperaturesArray);
    setMinTemp(TemperaturesMin.toFixed(1));

    const TemperaturesMax = Math.max(...TemperaturesArray);
    setMaxTemp(TemperaturesMax.toFixed(1));
  };

  const handleClick = ({ key }) => {
    setCity(key);
    async function fetchData() {
      const Weatherresponse = await getWeatherForecast(key);
      const DayResponse = await getWeatherForecast(key);

      CalculateSunTimes(DayResponse);
      CaluclateTemperatures(DayResponse);
      setWeatherData(Weatherresponse[0].weather[0]);
    }
    fetchData();
  };

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
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Select City <DownOutlined />
        </div>
      </Dropdown>
      <Divider />
      <Typography.Title>Current Weather </Typography.Title>
      <WeatherDataSection city={city} weatherData={weatherData} />
      <SunriseSunsetSection
        SunRise={SunRise}
        SunSet={SunSet}
        SunTime={SunTime}
      />
      <WeatherForecast
        AverageTemp={AverageTemp}
        MinTemp={MinTemp}
        MaxTemp={MaxTemp}
      />
    </div>
  );
};

export default Weather;
