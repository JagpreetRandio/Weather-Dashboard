// date will be added to the top of the page
var todayDate = moment();
$("#header-time").text(todayDate.format("LLLL"));

//API KEY 
var key = "1dce1fbc0faf4a6477d89bb59d560269"; 

//variables for code
var cities = [];

var cityForm =document.querySelector("#city-search");
var cityInput =document.querySelector("#city");
var weatherContainer =document.querySelector("#weather-container");
var citySearch =document.querySelector("#searched");
var forecastTitle =document.querySelector("#forecast");
var forecastContainer =document.querySelector("#fiveday-container");
var pastSearchButton =document.querySelector("#past-buttons");

//when searching a city
var sumbitHandler = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    if(city){
        // will get current weather
        getCityWeather(city);
        // and five day forecast
        get5Day(city);
        cities.unshift({city});
        cityInput.value = "";
    } else{
        //an alert will show up if you have not entered in a city
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

//search will be saved in the local storage
var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

//for city weather, fetching the api 
var getCityWeather = function(city){
    var apiKey = "1dce1fbc0faf4a6477d89bb59d560269"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

// this will clear the data, old content
var displayWeather = function(weather, searchCity){
    weatherContainer.textContent= "";  
    citySearch.textContent=searchCity;
    
    //create current date within a span element 
    // this will be at the top 
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearch.appendChild(currentDate);

    //this is will be for the images that go for the forecast
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearch.appendChild(weatherIcon);

    //creating an element for the current temperature 
   var temperature = document.createElement("span");
   temperature.textContent = "Temperature: " + weather.main.temp + " °F";
   temperature.classList = "list-group-item"

    //create a span element to hold Wind data
    var windSpeed = document.createElement("span");
    windSpeed.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeed.classList = "list-group-item"

   //creating an element for the current humidity
   var humidity = document.createElement("span");
   humidity.textContent = "Humidity: " + weather.main.humidity + " %";
   humidity.classList = "list-group-item"

    // variables for LAT/LON     
   var lat = weather.coord.lat;
   var lon = weather.coord.lon;

    // appending each variable to the container 
    // the container will contain all of the weather information
    weatherContainer.appendChild(temperature);
    weatherContainer.appendChild(windSpeed);
    weatherContainer.appendChild(humidity);

}

// now we're working on the 5-day forecast 
var get5Day = function(city){
    var apiKey = "1dce1fbc0faf4a6477d89bb59d560269"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           displayDay(data);
        });
    });
};

// for 5-day forecast 
var displayDay = function(weather){
    forecastContainer.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";
    // 5-day forecast will appear when city is searched 

    // creating a for loop
    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
       console.log(dailyForecast)
    
        //creating an div element for the daily forecast 
        var forecastEl=document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";

        //create date element
        var forecastDate = document.createElement("h5")
        forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);

        //icons that will be used to show the weather 
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

        // append the the weather icon to the forecast element 
        forecastEl.appendChild(weatherIcon);
        
        // this will display the temperature
        var forecastTemp=document.createElement("span");
       forecastTemp.classList = "card-body text-center";
       forecastTemp.textContent = "Temperature: " + dailyForecast.main.temp + " °F";

       //this will display the wind speed
       var windSpeed = document.createElement("span");
       windSpeed.textContent = "Wind Speed: " + dailyForecast.wind.speed + " MPH";
       windSpeed.classList = "card-body text-center";
       
       //this will display the humidity
       var forecastHum=document.createElement("span");
       forecastHum.classList = "card-body text-center";
       forecastHum.textContent = "Humidity: " + dailyForecast.main.humidity + "  %";
       
       // append all the elements to the forecast element 
       forecastEl.appendChild(forecastTemp);
       forecastEl.appendChild(windSpeed);
       forecastEl.appendChild(forecastHum);

       //now we are appending the forecast to the forecast container
       forecastContainer.appendChild(forecastEl);


}};

//this will show the past searches 
var pastSearch = function(pastSearch){
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButton.prepend(pastSearchEl);
};


var pastSearchHandle = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
};

cityForm.addEventListener("submit", sumbitHandler);
pastSearchButton.addEventListener("click", pastSearchHandle);
