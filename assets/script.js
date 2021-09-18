var apiKey = "33779a5f8de4314c5440a2282f021ea5";
var cityWeather = document.getElementById('city-weather-container');
var searchBtn = document.getElementById('search-button');
var searchInput = document.getElementById("cityInput");
var citySearch = document.getElementById('city-search');
var currentWeatherEl = document.getElementById("current-weather-container")
var forecastContainerEl = document.getElementById("forecast-container")





function pushCitySearch(){
    var someCity = searchInput.value.trim();
    cities.push(someCity);
    console.log(cities);
    
};


var cities = [];
var pastCity = cities[cities.length - 1];

console.log(pastCity);

function weatherApi(city){
    
    console.log(city, 'city name')
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';

    fetch(requestUrl)
         .then((response) => {
             if (response.ok) {
                 return response.json();
             } else {
                 throw new Error('NETWORK RESPONSE NOT OK');
             }
         })
         .then (function (data) {
             console.log(data);
             displayWeather(data, city);
             
         })
         .catch((error) => {
             console.error('FETCH ERROR:', error);
         })
};

function UVIndex(lat, lon){
    var apiUvRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial'
    fetch(apiUvRequest)
        .then((response) => {
             if (response.ok) {
                 return response.json();
              } else {
                  throw new Error('NETWORK RESPONSE NOT OK');
             }
        })
        .then (function (data) {
            console.log(data);
            displayUv(data)

       })
        .catch((error) => {
             console.error('FETCH ERROR:', error);
         })
};

function displayWeather(weather, searchCity){
    // clear content
    cityWeather.textContent = '';
    citySearch.textContent = searchCity;
    cityWeather.appendChild(citySearch);
    cityWeather.appendChild(currentWeatherEl);

    // console.log(weather);

    var todayDate = document.createElement('span');
    todayDate.textContent = moment(weather.dt.value).format(" MMM D, YYYY");
    citySearch.appendChild(todayDate);

    // var weatherPic = document.createElement('img');
    // weatherPic.setAttribute('src', 'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png');
    // citySearch.appendChild(citySearch);

    var tempEl = document.createElement('div');
    tempEl.textContent = 'Temperate is ' + weather.main.temp + ' F';
    tempEl.setAttribute('class', 'list-group-item');

    var humidityEl = document.createElement('div');
    humidityEl.textContent = 'Humididty is ' + weather.main.humidity + '%';
    humidityEl.setAttribute('class', 'list-group-item');
    
    var wind = document.createElement('div');
    wind.textContent = 'Wind Speed is ' + weather.wind.speed + "mph"
    wind.setAttribute("class", "list-group-item");

    
    currentWeatherEl.appendChild(tempEl);
    currentWeatherEl.appendChild(humidityEl);
    currentWeatherEl.appendChild(wind);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;

    UVIndex(lat,lon);
    console.log(UVIndex(lat,lon));
    
};

// function uvIndex (lat, lon) {

//     var apiUvRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial'

//     fetch(apiUvRequest)
//     .then(function (response){
//         response.json()})

//     .then(fucntion(data){
//             displayUv(data)
//     })
// };

function displayUv(index){
    var uvEl = document.createElement('div');
    uvEl.textContent = 'UV Index is ' + index.value;
    uvEl.setAttribute('class', 'list-group-item')

    currentWeatherEl.appendChild(uvEl);
};

function fiveDay(city){
    var apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey + '&units=imperial';

    fetch(apiForecast)
    .then(function(response){
        response.json()
        .then(function(data){
            displayForecast(data)
        })
    })

};

function displayForecast(weather){
    forecastContainerEl.textContent = "";
    forecastContainerEl.textContent = '5-Day Forecast'

    var forecast = weather.list;
    
    for(var i = 5; i < forecast.length; i=i+8){
        var dailyForecast = forecast[i];


        var forecastEl = document.createElement('div');
        forecastEl.setAttribute('class', 'card bg-primary text-light m-2');

        var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

        var weatherIcon = document.createElement("img")
       weatherIcon.setAttribute("class", "card-body text-center");
       weatherIcon.setAttribute("src", 'https://openweathermap.org/img/wn/' + dailyForecast.weather[0].icon +'@2x.png');  

       
        forecastEl.appendChild(weatherIcon);
       
       
        var forecastTempEl=document.createElement("span");
       forecastTempEl.setAttribute("class", "card-body text-center");
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        
        forecastEl.appendChild(forecastTempEl);

        var forecastHumEl=document.createElement("span");
       forecastHumEl.setAttribute("class", "card-body text-center");
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       
        forecastEl.appendChild(forecastHumEl);

       
        forecastContainerEl.appendChild(forecastEl);
    };
};



searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    var city = searchInput.value.trim();
    console.log(city);
    pushCitySearch();
    console.log(city);
    weatherApi(city);
    fiveDay(city);
    
});
// button is clicked
    // Event Listener on serach button
// Function to fetch API
    //fetch request using openWeatherAPI
        //seperate api call for UV index
// dom elemtns are changed to reflect weather data
    // take fetch response and alter HTML elements
    // build cards based on data