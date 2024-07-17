const searchButton = document.querySelector('#searchBtn');
const inputCity = document.querySelector('#inputText');
const lightMode = document.querySelector('.lightBtn');
const darkMode = document.querySelector('.darkBtn');
const mainContainer = document.querySelector(".wrapper-container");
const API_KEY = '636907694b514dd3b39104754232612';
const centigradeButton = document.querySelector('#centigradeBtn');
const fahrenheitButton = document.querySelector('#fahrenheitBtn');
let temperature = document.querySelector("#temperature");
let cityName = document.querySelector("#cityName");
let countryName = document.querySelector("#countryName");
let Time = document.querySelector('.time')
let weatherState = document.querySelector(".weatherState")
let uvIndex = document.querySelector('.uv-index');
let windStatus = document.querySelector('.wind-status');
let sunrise = document.querySelector('.sunrise');
let sunset = document.querySelector('.sunset');
let Humidity = document.querySelector('.humidity');
let Precipitation = document.querySelector('.precipitation');
let Cloud = document.querySelector('.cloud');
let windDirection = document.querySelector('.wind-direction');
let weatherImage = document.getElementById('weather-image');
let DateText = document.querySelector('.date');
const loaderImage = document.querySelector('#loader');
const DEFAULT_CITY = "New York";

// function to get weather data
async function getWeatherData(city) {
    try {
        // Show the loader
        loaderImage.style.display = "block"; 
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${inputCity.value}&aqi=yes&day=7&alerts=yes`)
        if(!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error("Error in fetching weather data:", error);
        return null;
    }
    finally {
        // Hide the loader
        loaderImage.style.display = "none"; 
    }
}

// calculating current time
const getCurrentTime = () => {
    let date  = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes; 
    let currentTime = hours + ":" + minutes + " " + ampm;
    return currentTime;
}

// Function to update weather information
async function updateWeather(city) {
    try {
        loader = true
        const result = await getWeatherData(city);
        if (result) {
            let country = result.location.country; 
            let city = result.location.name;
            var temperatureInCelcius = result.current.temp_c;
            var temperatureInFahrenheit = result.current.temp_f;
            let cloud = result.current.cloud;
            let conditionText = result.current.condition.text;
            let conditionIcon = result.current.condition.icon;
            let humidity = result.current.humidity;
            let UvIndex = result.current.uv;
            let wind = result.current.wind_kph;
            let winddirection = result.current.wind_dir;
            let precipitation = result.current.precip_mm;
            let sunRise = result.forecast.forecastday[0].astro.sunrise;
            let sunSet = result.forecast.forecastday[0].astro.sunset;
            let date = result.forecast.forecastday[0].date;
            let time = getCurrentTime();

            weatherImage.src = conditionIcon;
            temperature.textContent = temperatureInCelcius + " °C";
            countryName.innerHTML = country;
            cityName.textContent = city + ",";
            weatherState.textContent = conditionText;
            uvIndex.textContent = UvIndex;
            Time.textContent = time;
            Humidity.textContent = humidity + "%";
            Precipitation.textContent = precipitation + "mm";
            Cloud.textContent = cloud;
            sunrise.textContent = sunRise;
            sunset.textContent = sunSet;
            windStatus.textContent = wind + "Kph";
            windDirection.textContent = winddirection;
            DateText.textContent = date;

            // Add event listeners for temperature unit conversion
            fahrenheitButton.addEventListener("click", () => {
                temperature.textContent = temperatureInCelcius + " °C";
            });

            centigradeButton.addEventListener("click", () => {
                temperature.textContent = temperatureInFahrenheit + " °F";
            });
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    updateWeather(inputCity.value);
});

// Load default weather data on page load
document.addEventListener('DOMContentLoaded', () => {
    inputCity.value = DEFAULT_CITY;
    updateWeather(DEFAULT_CITY);
});

// dark mode function
darkMode.addEventListener("click" , () => {
    mainContainer.classList.add("dark-mode");
    darkMode.style.display = "none";
    lightMode.style.display = "inline";
    lightMode.style.backgroundColor = "rgb(46, 49, 54)";
    weatherState.style.color = "brown"
});

// light mode function
lightMode.addEventListener("click", () => {
    mainContainer.classList.remove("dark-mode");
    darkMode.style.display = "inline";
    lightMode.style.display = "none";
    weatherState.style.color = "orange"
});