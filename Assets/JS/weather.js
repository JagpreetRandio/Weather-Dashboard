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


