$(document).ready(function() {
    // Added variables needed to develop code
    var enterCity = document.getElementById("enterCity");
    var nameEl = document.getElementById("city-name");
    var searchBtn = document.getElementById("search-button");
    var clearHistory = document.getElementById("clearHistory");
    var history = document.getElementById("history");
    var weatherPic = document.getElementById("weather-pic");
    var curTemp =document.getElementById("temperature");
    var curHum = document.getElementById("humidity");
    var curWind = document.getElementById("wind");
    var uvIndex = document.getElementById("UV-index");
    var fiveDay = document.getElementById("fiveday");
    var today = document.getElementById("today");

    //time shown on top of the page 
    var todayDate = moment();
    $("#header-time").text(todayDate.format("LLLL"));

    // Adding API KEY 
    var apiKey = "1dce1fbc0faf4a6477d89bb59d560269"; 

    // This is the search history that will store the data  in the local storage
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

});