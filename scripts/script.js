//Author: Madhumitha Prabakaran

// Current Condition

$(document).ready(function(){ 

    function currentCondition(cityId) {
        let queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&APPID=23dc5f87ddf3af5418217e5f3640466c&units=imperial";
        
        $.getJSON(queryURL, function(data){
            updateDOM(data);
        });
    }

    function UVdata(lat, lon) {
        let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=23dc5f87ddf3af5418217e5f3640466c&lat=" + lat+ "&lon=" + lon;

        $.getJSON(uvURL, function(UV_data){
            updateUV(UV_data);
        });
    }

    function updateDOM(data) {
        let cityName = data.city.name;
        let iconCode = data.list[0].weather[0].icon;
        let iconURL = "http://openweathermap.org/img/w/" + iconCode + '.png';
        let temp = Math.round(data.list[0].main.temp);
        let timeNow = data.list[0].dt_txt.substring(0, 10);
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

    //Function Calls for current conditions 

    currentCondition(4724129);
    UVdata(30.5083, -97.679);

    // 5-Day Forecast 

    function fiveDayForecast(cityId) {
        let dayForecastURL = "http://api.openweathermap.org/data/2.5/forecast?appid=23dc5f87ddf3af5418217e5f3640466c&id=" + cityId + "&count=10&units=imperial";

        $.getJSON(dayForecastURL, function(fiveDaydata){
            updateForecast(fiveDaydata);
        });
    }

    function udpateData(fiveDayData, i, count) {
        let day = fiveDayData.list[i].dt_txt.substring(0,10);
        let dayIcon = fiveDayData.list[i].weather[0].icon;
        let iconURL = "http://openweathermap.org/img/w/" + dayIcon + '.png';
        let temp = Math.round(fiveDayData.list[i].main.temp);
        let humid = fiveDayData.list[i].main.humidity;

        $('#day'+count).text(day);
        $('#wIcon'+count).attr('src', iconURL);
        $('#temp'+count).text("Temp : " + temp + String.fromCharCode(176) + " F");
        $('#humid'+count).text('Humidity:' + humid +  "%");
    }

    function updateForecast(fiveDaydata) {
        let size = fiveDaydata.list.length;
        let count = 1;
        let currDay = fiveDaydata.list[0].dt_txt.substring(0,10);

        for (let i = 0 ; i < (size) ; i++) {
            let day = fiveDaydata.list[i].dt_txt.substring(0,10);
            if (currDay != day) {
                //console.log("Invoke a diff date "+ currDay, day);
                udpateData(fiveDaydata, i, count);
                currDay = day;
                count++;
            } 
        }
    }

    // Function Calls for five day forecast 

    fiveDayForecast(4724129);

    // Search for a city

    function searchHistory() {

     $('#searchButton').on('click', function(event) {
      event.preventDefault();
      let quest = $("#runSearch").val().trim(); 
      let searchURL = "http://api.openweathermap.org/data/2.5/forecast?APPID=23dc5f87ddf3af5418217e5f3640466c&units=imperial&q=" + quest;
      
      $.getJSON(searchURL, function(searchData){
        console.log(searchData);          //For testing 
        console.log(quest);
        console.log(searchURL);

        let cityId = searchData.city.id;
        let latitude = searchData.city.coord.lat;
        let longitude = searchData.city.coord.lon;

        currentCondition(cityId);
        UVdata(latitude, longitude);
        fiveDayForecast(cityId);
        }); 
     })
    }

    searchHistory();

});