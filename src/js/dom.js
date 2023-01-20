/* eslint-disable */


import { getWeather, sectionDisplayWeather } from "./weather.js";

const location = document.querySelector("#location");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const form = document.querySelector("form");
const search = document.querySelector("#search");
const button = document.querySelector("button");
const searchIcon = document.querySelector("img");
const mainIcon = document.querySelector("#main-icon");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const wind = document.querySelector("#wind");
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const uvIndex = document.querySelector("#uv-index");
const sunrise = document.querySelector("#sunrise");
const pressure = document.querySelector("#pressure");
const rainTitle = document.querySelector("#rain-title");
const rainValue = document.querySelector("#rain-value");
const sunset = document.querySelector("#sunset");
const modeButtons = document.querySelectorAll(".mode-button");
const sectionCards = document.querySelectorAll(".section-info-card");
const cardIcons = document.querySelectorAll(".card-icon");
const cardTemps = document.querySelectorAll(".card-temp");
const cardTimes = document.querySelectorAll(".card-time");
const rightButton = document.querySelector("#right-button");
const leftButton = document.querySelector("#left-button");

export {
  location,
  date,
  time,
  form,
  search,
  button,
  searchIcon,
  temperature,
  description,
  wind,
  feelsLike,
  humidity,
  uvIndex,
  sunrise,
  pressure,
  rainTitle,
  rainValue,
  sunset,
  sectionCards,
  mainIcon,
  cardIcons,
  cardTemps,
  cardTimes,
  leftButton,
  rightButton,
  modeButtons
};
