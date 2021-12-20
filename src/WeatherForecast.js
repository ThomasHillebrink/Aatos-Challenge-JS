import React from "react";

export const WeatherForecast = ({ AverageTemp, MinTemp, MaxTemp }) => {
  return (
    <div>
      <p>7 day forecast</p>
      <h2>Average: {AverageTemp} °C</h2>
      <h2>Min: {MinTemp} °C</h2>
      <h2>Max: {MaxTemp} °C</h2>
    </div>
  );
};
