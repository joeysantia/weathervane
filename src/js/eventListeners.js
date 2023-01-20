import {search, searchIcon, form, modeButtons, leftButton, cardTimes, rightButton, } from './dom'
import {getWeather, sectionDisplayWeather } from './weather'
import { weather, isHourly, setIsHourly } from "../index.js";


searchIcon.addEventListener("click", (e) => {
    getWeather(search.value);
  });
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather(search.value);
  });
  
  modeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!button.classList.contains("active")) {
        modeButtons.forEach((button) => {
          button.classList.toggle("active");
        });
        setIsHourly();
        console.log(isHourly);
        sectionDisplayWeather(weather, 0);
      }
    });
  });
  

leftButton.addEventListener("click", (e) => {
    switch (true) {
      case cardTimes[0].textContent === weather.hourlyForecast[8].dateAndTime:
        sectionDisplayWeather(weather, 0);
        leftButton.classList.toggle("inactive");
        break;
      case cardTimes[0].textContent === weather.hourlyForecast[16].dateAndTime:
        sectionDisplayWeather(weather, 8);
        rightButton.classList.toggle("inactive");
        break;
    }
  });

  rightButton.addEventListener("click", (e) => {
    switch (true) {
      case cardTimes[0].textContent === weather.hourlyForecast[0].dateAndTime:
        sectionDisplayWeather(weather, 8);
        leftButton.classList.toggle("inactive");
        break;
      case cardTimes[0].textContent === weather.hourlyForecast[8].dateAndTime:
        sectionDisplayWeather(weather, 16);
        rightButton.classList.toggle("inactive");
        break;
    }
  });
  
  console.log('this should run')