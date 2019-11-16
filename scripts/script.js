//Author: Madhumitha Prabakaran

// Current Condition

$(document).ready(function(){ 

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
            updateUV(UV_data);
        });
    }

    UVdata();

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


    // 5-Day Forecast 

    function fiveDayForecast() {
        
        let dayForecastURL = "http://api.openweathermap.org/data/2.5/forecast?appid=23dc5f87ddf3af5418217e5f3640466c&id=4724129&count=10&units=imperial";

        $.getJSON(dayForecastURL, function(fiveDaydata){

            updateForecast(fiveDaydata);
        });
    }

    fiveDayForecast();

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

        for (let i = 1 ; i < size; i++) {
            let day = fiveDaydata.list[i].dt_txt.substring(0,10);
            //console.log(day);
            if (currDay != day) {
                //console.log("Invoke a diff date "+ currDay, day);
                udpateData(fiveDaydata, i, count);
                currDay = day;
                count++;
            } 
            /*else {
                console.log("current day and day equal "+ currDay, day);
            }*/
        }
    }

    // Search for a city

    function searchHistory() {

     $('#searchButton').on('click', function(event) {
      event.preventDefault();
      let quest = $("#runSearch").val().trim();
      let searchURL = "http://api.openweathermap.org/data/2.5/weather?APPID=23dc5f87ddf3af5418217e5f3640466c&units=imperial&q=" + quest;
    
      $.getJSON(searchURL, function(searchData){
        console.log(searchData);          //For testing 
        console.log(quest);
        console.log(searchURL);        
        updateSearch(searchData);
        });      
     })
    }

    searchHistory();

    function updateSearch(searchData) {
        let cityId = searchData.id;
        console.log(cityId);
        updateDOM(searchData);
        updateForecast(searchData);
    }
});