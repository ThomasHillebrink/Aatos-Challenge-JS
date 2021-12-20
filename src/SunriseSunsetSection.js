import React from "react";

export const SunriseSunsetSection = ({ SunRise, SunSet, SunTime }) => {
  return (
    <div>
      <h2>Sunrise: {SunRise}</h2>
      <h2>SunSet: {SunSet}</h2>
      <h2>
        Sun is up for about {SunTime.hours} hours and {SunTime.minutes} minutes.{" "}
      </h2>
    </div>
  );
};
