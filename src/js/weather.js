/* eslint-disable */
require("babel-polyfill");
("use strict");

import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";

import {
  location,
  date,
  time,
  temperature,
  description,
  wind,
  feelsLike,
  sunrise,
  sunset,
  cardIcons,
  mainIcon,
  cardTemps,
  cardTimes,
  rightButton,
  leftButton,
} from "./dom";

import {
  timezoneNormalize,
  getDate,
  getHour,
  getTime,
  isDaytime,
  windCardinal,
  setIcon,
  setBackground,
} from "./translators.js";

import { weather, setWeather, isHourly, setIsHourly } from "../index";

async function getCity(cityName) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=7a607fb85dc42ddc447af09a7ffec8fa`
    );
    const json = await response.json();
    return [json[0].lat, json[0].lon];
  } catch (err) {
    console.error(err);
    alert("Invalid city. Please try again.");
  }
}

async function fetchWeather([lat, lon]) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=7a607fb85dc42ddc447af09a7ffec8fa`
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

function weatherSummary(object) {
  let timezone = object.timezone;

  let currentWeather = {
    dateAndTime: timezoneNormalize(object.current.dt, object.timezone),
    date: getDate(object.current.dt, object.timezone),
    time: getTime(object.current.dt, object.timezone),
    isDaytime: isDaytime(
      fromUnixTime(object.current.dt),
      fromUnixTime(object.daily[0].sunrise),
      fromUnixTime(object.daily[0].sunset)
    ),
    sunrise: timezoneNormalize(object.daily[0].sunrise, object.timezone),
    sunset: timezoneNormalize(object.daily[0].sunset, object.timezone),
    temperature: `${Math.round(object.current.temp)}\xB0`,
    feelsLike: `Feels like ${Math.round(object.current.feels_like)}\xB0`,
    weather: object.current.weather[0].main,
    wind: `${Math.round(object.current.wind_speed)} mph ${windCardinal(
      object.current.wind_deg
    )}`,
    uvIndex: Math.round(object.current.uvi),
    humidity: `${object.current.humidity}%`,
    pressure: `${object.current.pressure} inHg`,
  };

  let sevenDayForecast = [];
  for (let i = 0; i < object.daily.length; i++) {
    sevenDayForecast[i] = {
      dateAndTime: timezoneNormalize(object.daily[i].dt, object.timezone),
      dailyHigh: `${Math.round(object.daily[i].temp.max)}\xB0`,
      dailyLow: `${Math.round(object.daily[i].temp.min)}\xB0`,
      isDaytime: true,
      weather: object.daily[i].weather[0].main,
      wind: `${Math.round(object.daily[i].wind_speed)} mph ${windCardinal(
        object.daily[i].winc_deg
      )}`,
      uvIndex: Math.round(object.daily[i].uvi),
      humidity: `${object.daily[i].humidity}%`,
      sunrise: timezoneNormalize(object.daily[i].sunrise, object.timezone),
      sunset: timezoneNormalize(object.daily[i].sunset, object.timezone),
      rain: `${object.daily[i].rain || 0} in`,
      pressure: `${object.daily[i].pressure} inHg`,
    };
  }

  let hourlyForecast = [];
  for (let i = 0; i < 25; i++) {
    hourlyForecast[i] = {
      dateAndTime: getHour(object.hourly[i].dt, object.timezone),
      isDaytime: isDaytime(
        fromUnixTime(object.hourly[i].dt),
        fromUnixTime(object.daily[0].sunrise),
        fromUnixTime(object.daily[0].sunset)
      ),
      weather: object.hourly[i].weather[0].main,
      temperature: `${Math.round(object.hourly[i].temp)}\xB0`,
      wind: `${Math.round(object.hourly[i].wind_speed)} mph ${windCardinal(
        object.hourly[i].wind_deg
      )}`,
      feelsLike: `Feels like ${Math.round(object.hourly[i].feels_like)}\xB0`,
      uvIndex: Math.round(object.hourly[i].uvi),
      humidity: `${object.hourly[i].humidity}%`,
    };
  }

  return { timezone, currentWeather, sevenDayForecast, hourlyForecast };
}

function mainDisplayWeather(cityName, weather) {
  location.textContent = cityName;
  date.textContent = weather.currentWeather.date;
  time.textContent = weather.currentWeather.time;
  temperature.textContent = weather.currentWeather.temperature;
  description.textContent = weather.currentWeather.weather;
  wind.textContent = weather.currentWeather.wind;
  feelsLike.textContent = weather.currentWeather.feelsLike;
  sunrise.textContent = format(new Date(weather.currentWeather.sunrise), "p");
  sunset.textContent = format(new Date(weather.currentWeather.sunset), "p");

  setIcon(weather.currentWeather, mainIcon);
  setBackground(weather.currentWeather);
}

function sectionDisplayWeather(weather, weatherIndex) {
  if (isHourly) {
    for (let i = 0; i < 8; i++) {
      setIcon(weather.hourlyForecast[weatherIndex], cardIcons[i]);
      cardTemps[i].textContent =
        weather.hourlyForecast[weatherIndex].temperature;
      cardTimes[i].textContent =
        weather.hourlyForecast[weatherIndex].dateAndTime;
      weatherIndex++;
    }
    if (rightButton.classList.contains("inactive")) {
      rightButton.classList.remove("inactive");
    }
  } else {
    for (let i = 0; i < 8; i++) {
      setIcon(weather.sevenDayForecast[weatherIndex], cardIcons[i]);
      cardTemps[
        i
      ].textContent = `${weather.sevenDayForecast[weatherIndex].dailyHigh} / ${weather.sevenDayForecast[weatherIndex].dailyLow}`;
      cardTimes[i].textContent = format(
        new Date(weather.sevenDayForecast[weatherIndex].dateAndTime),
        "EEEE"
      );
      weatherIndex++;
    }
    leftButton.classList.add("inactive");
    rightButton.classList.add("inactive");
  }
}

async function getWeather(cityName) {
  const city = await getCity(cityName);
  const object = await fetchWeather([...city]);
  setWeather(weatherSummary(object));
  console.log(weather);
  mainDisplayWeather(cityName, weather);
  sectionDisplayWeather(weather, 0);
}

export { getWeather, mainDisplayWeather, sectionDisplayWeather };
