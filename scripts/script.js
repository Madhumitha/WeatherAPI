//Author: Madhumitha Prabakaran

// Current Condition

function currentCondition() {

    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=4724129&APPID=23dc5f87ddf3af5418217e5f3640466c&units=imperial";
    
    $.getJSON(queryURL, function(data){
        updateDOM(data);
    });
}

currentCondition();

function UVdata() {

    let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=23dc5f87ddf3af5418217e5f3640466c&lat=30.5083&lon=-97.679"

    $.getJSON(uvURL, function(UV_data){
        console.log(UV_data)            //For testing 
        console.log(UV_data.value);     // For testing
        updateUV(UV_data);
    });
}

UVdata();

function updateDOM(data) {

    let cityName = data.city.name;
    let iconCode = data.list[0].weather[0].icon;
    let iconURL = "http://openweathermap.org/img/w/" + iconCode + '.png';
    let temp = Math.round(data.list[0].main.temp);
    let timeNow = moment().format('L');
    let showHumid = data.list[0].main.humidity;
    let showWind = data.list[0].wind.speed;

    $('#city').text(cityName + " (" + timeNow + ')');
    $('#wIcon').attr('src', iconURL);
    $('#temp').text("Temperature : " + temp + String.fromCharCode(176) + " F");
    $('#humid').text('Humidity: ' + showHumid +  "%");
    $('#wind').text('Wind Speed: ' + showWind + 'MPH');
}

function updateUV(UV_data) {

    let showUV = UV_data.value;

    $('#UV').text("UV Index: " + showUV);
}


// 5-Day Forecast 

function fiveDayForecast() {
    
    let dayForecastURL = "http://api.openweathermap.org/data/2.5/forecast?appid=23dc5f87ddf3af5418217e5f3640466c&id=4724129&count=10&units=imperial";

    $.getJSON(dayForecastURL, function(fiveDaydata){
        //Testing
        console.log(fiveDaydata);
        console.log(fiveDaydata.list[1].weather[0].icon)

        updateForecast(fiveDaydata);
    });
}

fiveDayForecast();

function updateForecast(fiveDaydata) {

    let day1 = fiveDaydata.list[1].dt_txt.substring(0, 10);
    let icon1Code = fiveDaydata.list[1].weather[0].icon;
    let icon1URL = "http://openweathermap.org/img/w/" + icon1Code + '.png';
    let temp1 = Math.round(fiveDaydata.list[1].main.temp);
    let humid1 = fiveDaydata.list[1].main.humidity;

    $('#day1').text(day1);
    $('#wIcon1').attr('src', icon1URL);
    $('#temp1').text("Temp : " + temp1 + String.fromCharCode(176) + " F");
    $('#humid1').text('Humidity:' + humid1 +  "%");


    let day2 = fiveDaydata.list[9].dt_txt.substring(0, 10);
    let icon2Code = fiveDaydata.list[9].weather[0].icon;
    let icon2URL = "http://openweathermap.org/img/w/" + icon2Code + '.png';
    let temp2 = Math.round(fiveDaydata.list[9].main.temp);
    let humid2 = fiveDaydata.list[9].main.humidity;

    $('#day2').text(day2);
    $('#wIcon2').attr('src', icon2URL);
    $('#temp2').text("Temp : " + temp2 + String.fromCharCode(176) + " F");
    $('#humid2').text('Humidity:' + humid2 +  "%");

    let day3 = fiveDaydata.list[17].dt_txt.substring(0, 10);
    let icon3Code = fiveDaydata.list[17].weather[0].icon;
    let icon3URL = "http://openweathermap.org/img/w/" + icon2Code + '.png';
    let temp3 = Math.round(fiveDaydata.list[17].main.temp);
    let humid3 = fiveDaydata.list[17].main.humidity;

    $('#day3').text(day3);
    $('#wIcon3').attr('src', icon3URL);
    $('#temp3').text("Temp : " + temp3 + String.fromCharCode(176) + " F");
    $('#humid3').text('Humidity:' + humid3 +  "%");

    let day4 = fiveDaydata.list[25].dt_txt.substring(0, 10);
    let icon4Code = fiveDaydata.list[25].weather[0].icon;
    let icon4URL = "http://openweathermap.org/img/w/" + icon2Code + '.png';
    let temp4 = Math.round(fiveDaydata.list[25].main.temp);
    let humid4 = fiveDaydata.list[25].main.humidity;

    $('#day4').text(day4);
    $('#wIcon4').attr('src', icon4URL);
    $('#temp4').text("Temp : " + temp4 + String.fromCharCode(176) + " F");
    $('#humid4').text('Humidity:' + humid4 +  "%");

    let day5 = fiveDaydata.list[32].dt_txt.substring(0, 10);
    let icon5Code = fiveDaydata.list[32].weather[0].icon;
    let icon5URL = "http://openweathermap.org/img/w/" + icon2Code + '.png';
    let temp5 = Math.round(fiveDaydata.list[32].main.temp);
    let humid5 = fiveDaydata.list[32].main.humidity;

    $('#day5').text(day5);
    $('#wIcon5').attr('src', icon5URL);
    $('#temp5').text("Temp : " + temp5 + String.fromCharCode(176) + " F");
    $('#humid5').text('Humidity:' + humid5 +  "%");
}