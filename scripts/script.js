//Author: Madhumitha Prabakaran

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
        console.log(UV_data)
        console.log(UV_data.value);
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