# weather-app

TODO

INITIAL SETUP
1. Run npm init X 
2. Set up babel X
3. Set up prettier X
4. Set up eslint X
5. Set up webpack X 
6. Set up src and dist folders X
7. Set up CSS with style-loader and css-loader X
8. Set up index.html, index.js, style.css X
9. Make sure that everything works and is connected X

INFORMATION NEEDED FOR THE APP

MAIN FUNCTIONALITY
1. Create a translator function
    a. Translates the dateAndTime value into day (of the week) for the 7-day forecast, and into hour for the hourly forecast X
    b. Create a new value for each forecast object that designates day/night (isDay boolean) X
    c. translate windDirection into cardinal directions
        i. 337.5 < x < 360 && 0 < x <  22.5 is N
        ii. 22.5 < x < 67.5 is NW
        etc. X 
    d. add mph to windSpeed X 
    e. Translate sunrise and sunset into times X 
    f. translate humidity to a percentage x
    g. round all temperatures to the nearest whole number (Math.round()) X 
    h. Make sure that everything has units X
    h2. Time zones! Make sure that everything is in local time, not New York time X
    i. Compile all of this into the weather object X
2. Set up the html for the structure of the page after a window.onload() function

LAYOUT

Header: logo -> search bar
Main:
    if current:

        temperature     description
                        wind
                        feels like

                    alert

        humidity    uv index    sunrise
        pressure                sunset

    if daily 

        daily high      description
                        wind
        daily low

        humidity    uv index    sunrise
        pressure    rain        sunset

    if hourly 

        temperature     description
                        wind
                        feels like

        humidity    uv index    rain

Section

    card card card card card card card card 
    ---------------------------------------
    (if hourly, for each card)
    icon                time
    icon

    (if daily, for each card)
    icon                daily high
    day of week         daily low

3. Set up the CSS layout

REMAINING TASKS
1. Hourly and Daily buttons X
2. CSS classes that make Hourly and Daily look different when active X
3. Event Listeners that display hourly and daily forecasts when the above buttons are pressed X
4. Display city and current date/time in the main section
5. Color code the background in accordance with the weather summary
6. Pick fonts
Display weather data in the main section (perhaps make this optional)

TWEAKS
1. If any JS file is longer than 150 lines, see if you can break it up into separate modules
2. Add a "loading" component while the API data is being fetched 
3. Consider using classes - how might that work with the various forecasts ? Could you extend one into the other ? 


