/* eslint-disable */

import { leftButton, rightButton } from "./dom";
import { weather } from "../index";
import { formatInTimeZone } from "date-fns-tz";
import isAfter from "date-fns/isAfter";
import fromUnixTime from "date-fns/fromUnixTime";

function timezoneNormalize(dt, timezone) {
  const date = fromUnixTime(dt);
  return formatInTimeZone(date, timezone, "yyyy-MM-dd HH:mm:ss");
}

function getDayOfWeek(dt, timezone) {
  const date = fromUnixTime(dt);
  return formatInTimeZone(date, timezone, "eeee");
}

function getDate(dt, timezone) {
  const date = fromUnixTime(dt);
  return formatInTimeZone(date, timezone, "EEEE, LLLL eo");
}

function getHour(dt, timezone) {
  const date = fromUnixTime(dt);
  return formatInTimeZone(date, timezone, "h a");
}

function getTime(event, timezone) {
  const time = fromUnixTime(event);
  return formatInTimeZone(time, timezone, "p");
}

function isDaytime(time, sunrise, sunset) {
  return isAfter(sunset, time) && isAfter(time, sunrise);
}

function windCardinal(windDirection) {
  switch (true) {
    case (windDirection >= 0 && windDirection < 22.5) ||
      (windDirection > 337.5 && windDirection < 360):
      windDirection = "N";
      break;
    case windDirection >= 22.5 && windDirection < 67.5:
      windDirection = "NE";
      break;
    case windDirection >= 67.5 && windDirection < 112.5:
      windDirection = "E";
      break;
    case windDirection >= 112.5 && windDirection < 157.5:
      windDirection = "SE";
      break;
    case windDirection >= 157.5 && windDirection < 202.5:
      windDirection = "S";
      break;
    case windDirection >= 202.5 && windDirection < 247.5:
      windDirection = "SW";
      break;
    case windDirection >= 247.5 && windDirection < 292.5:
      windDirection = "W";
      break;
    case windDirection >= 292.5 && windDirection < 337.5:
      windDirection = "NW";
      break;
  }
  return windDirection;
}

//generalize this to be setCSS
function setIcon(forecast, icon) {
  let src;

  switch (true) {
    case forecast.weather === "Thunderstorm":
      src = "../src/images/thunderstorm.png";
      break;
    case forecast.weather === "Drizzle":
      src = weather.isDaytime
        ? "../src/images/day-rain.png"
        : "../src/images/night-rain.jpg";
      break;
    case forecast.weather === "Rain":
      src = "../src/images/showers.png";
      break;
    case forecast.weather === "Snow":
      src = "../src/images/snow.png";
      break;
    case forecast.weather === "Clear":
      src = forecast.isDaytime
        ? "../src/images/sun.png"
        : "../src/images/moon.png";
      break;
    case forecast.weather === "Clouds":
      src = "../src/images/cloud.png";
      break;
    default:
      src = "../src/images/mist.png";
      break;
  }

  icon.setAttribute("src", src);
}

function setBackground(forecast) {
  //All backgrounds courtesy of @rosecmeriam!
  let src;

  switch (forecast.weather) {
    case "Thunderstorm":
      src = "../src/images/thunderstorm-bg.jpg";
      break;
    case "Drizzle" || "Rain":
      src = "../src/images/rain-bg.jpg";
      break;
    case "Snow":
      src = forecast.isDaytime
        ? "../src/images/snow-day-bg.jpg"
        : "../src/images/snow-night-bg.jpg";
      break;
    case "Clear":
      src = forecast.isDaytime
        ? "../src/images/clear-day.jpg"
        : "../src/images/clear-night-bg.jpg";
      break;
    case "Clouds":
      src = "../src/images/rain-bg.jpg";
      break;
    default:
      src = "../src/images/mist-bg.jpg";
      break;
  }

  document.body.style.backgroundImage = `url(${src})`;

  if (
    src ===
    ("../src/images/clear-night-bg.jpg" || "../src/images/thunderstorm.jpg")
  ) {
    document.body.style.color = "white";
    leftButton.setAttribute("src", "../src/images/left-arrow-white.png");
    rightButton.setAttribute("src", "../src/images/right-arrow-white.png");
  } else {
    document.body.style.color = "black";
    leftButton.setAttribute("src", "../src/images/left-arrow.png");
    rightButton.setAttribute("src", "../src/images/right-arrow.png");
  }
}

export {
  timezoneNormalize,
  getDayOfWeek,
  getDate,
  getHour,
  getTime,
  isDaytime,
  windCardinal,
  setIcon,
  setBackground,
};
