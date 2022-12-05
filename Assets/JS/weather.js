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


