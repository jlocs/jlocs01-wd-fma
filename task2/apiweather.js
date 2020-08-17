$(document).ready(function() {

    $("#country").change(function() {

        let country = $(this).val();
        let cityList = "";
        if (country==="England") {
            cityList = "./uk_cities/england-cities.html";
        }
        else if (country==="Northern Ireland") {
            cityList = "./uk_cities/nireland-cities.html"
        }
        else if (country==="Scotland") {
            cityList = "./uk_cities/scotland-cities.html"
        }
        else if (country==="Wales") {
            cityList = "./uk_cities/wales-cities.html"
        }
        $("#city").load(cityList);

    })

    $("#city").change(function() {
        let city = $(this).val();
        let APPID = "928482e19bbfa4b1442601b2c23e9952"
        let URL = "https://api.openweathermap.org/data/2.5/weather?q="
            + city + ",uk&APPID=" + APPID

        $.getJSON(URL, function(response) {

                let cityName = response.name;
                let weatherDate = GetFormattedDate(new Date(response.dt*1000));
                let weatherConditions = response.weather[0].main;
                let kelvinTemperature = parseFloat(response.main.temp);
                let celsiusTemperature = parseInt(kelvinTemperature - 273.15);
                let fahrenheitTemperature = parseInt((celsiusTemperature*1.8)+32);
                let windSpeedKmph = parseFloat(response.wind.speed * 3.6);
                let windSpeedMph = parseFloat(response.wind.speed * 2.237);
                let windDegrees = parseInt(response.wind.deg);
                let windDirection = windDirectionConverter(windDegrees);
                let weatherIcon = '<img id="icon" src="http://openweathermap.org/img/wn/' + response.weather[0].icon
                    + '@2x.png" alt="weatherIcon"  width="150px" height="100%"/>'
                let extremeWeatherAlert = alertChecker(celsiusTemperature, windSpeedMph);
                weatherDisplay(cityName,weatherDate,weatherConditions,celsiusTemperature,fahrenheitTemperature,
                    windSpeedKmph, windSpeedMph,windDegrees,windDirection,weatherIcon, extremeWeatherAlert);
            })
        })

})

function weatherDisplay(city, date, conditions, celsius, fahrenheit, kmph, mph, degrees, direction, icon, alert){
    let sTxt = "<h2>" + city + ", United Kingdom<br>" + date + "</h2><br>" + icon
        + "<br> Temperature: " + celsius + "&deg; C / " + fahrenheit + "&deg; F <br>"
        + "Conditions: " + conditions + "<br> Wind speed:  " + mph.toFixed(2) + " mph , "
        + kmph.toFixed(2) + " kmph ,<br>Wind direction: "+ direction;

    if (alertChecker()) {
        sTxt += `<div id="red_alert"><br> <p id="alert"><h1>EXTREME WEATHER WARNING</h1></p></div>`;
    }

    $("#weather").html("");
    $("#weather").append(sTxt);

}

function alertChecker(celsius, mph) {
    if (celsius < 5 || celsius > 35 || mph > 50) {
        return true;
    }

}

//
function windDirectionConverter(degrees) {
    if (degrees > 0 && degrees < 25) {
        return "NORTH";
    } else if (degrees > 25 && degrees < 65) {
        return "NORTH EAST";
    } else if (degrees > 65 && degrees < 115) {
        return "EAST";
    } else if (degrees > 115 && degrees < 155) {
        return "SOUTH EAST";
    } else if (degrees > 155 && degrees < 205) {
        return "SOUTH";
    } else if (degrees > 205 && degrees < 245) {
        return "SOUTH WEST";
    } else if (degrees > 245 && degrees < 295) {
        return "WEST";
    } else if (degrees > 295 && degrees < 335) {
        return "NORTH WEST";
    } else if (degrees > 335 && degrees <= 360) {
        return "NORTH";
    }
}

//https://dzone.com/articles/javascript-convert-date
function GetFormattedDate(todayTime) {
    let month = todayTime.getMonth() + 1;
    let day = todayTime.getDate();
    let year = todayTime.getFullYear();
    return month + "/" + day + "/" + year;
}