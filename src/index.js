/* eslint-disable */

import "./style.css";
import "./js/eventListeners"
import { getWeather } from "./js/weather";

//revisit - see if there's a way to solve this without global variables;
let weather;
let isHourly = true;

function setWeather(value) {
  weather = value;
  return weather;
}

function setIsHourly() {
  isHourly = !isHourly;
}

window.onload = function () {
  getWeather("New York");
};

export { isHourly, setIsHourly, weather, setWeather };
