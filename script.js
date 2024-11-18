// OpenWeatherMap API key
const apiKey = '251e6841721ec83ba6dffc20bd43fe3f'; // Replace with your actual API key

let isCelsius = true; // Track current unit
const savedCities = []; // Store favorite cities

// Function to fetch weather data
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${isCelsius ? 'metric' : 'imperial'}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
            fetchForecast(city); // Fetch forecasts
            fetchAirQuality(data.coord.lat, data.coord.lon); // Fetch air quality
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        alert('An error occurred while fetching weather data.');
    }
}

// Fetch hourly and daily forecasts
async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${isCelsius ? 'metric' : 'imperial'}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '200') {
        displayHourlyForecast(data);
        displayDailyForecast(data);
    }
}

// Fetch air quality data
async function fetchAirQuality(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.list && data.list.length > 0) {
        displayAirQuality(data.list[0]);
    }
}

// Display current weather
function displayWeather(data) {
    const cityName = `${data.name}, ${data.sys.country}`;
    const temperature = `${data.main.temp}°${isCelsius ? 'C' : 'F'}`;
    const description = data.weather[0].description;
    const humidity = `Humidity: ${data.main.humidity}%`;
    const wind = `Wind: ${data.wind.speed} ${isCelsius ? 'km/h' : 'mph'}`;
    const sunrise = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    const sunset = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Update weather card details
    document.getElementById('cityName').innerText = cityName;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('description').innerText = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('humidity').innerText = humidity;
    document.getElementById('wind').innerText = wind;
    document.getElementById('sunrise').innerText = sunrise;
    document.getElementById('sunset').innerText = sunset;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('weatherIcon').alt = description;

    document.getElementById('weatherCard').classList.remove('hidden');
}

// Display air quality
function displayAirQuality(data) {
    const aqi = data.main.aqi; // Air Quality Index
    const quality = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const airQuality = `Air Quality: ${quality[aqi - 1]}`;

    document.getElementById('airQuality').innerText = airQuality;
}

// Add event listeners for search and location buttons
document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

document.getElementById('locationBtn').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${isCelsius ? 'metric' : 'imperial'}&appid=${apiKey}`;
        fetch(url).then(res => res.json()).then(displayWeather);
    });
});
// Get the selected language
function getSelectedLanguage() {
    return document.getElementById('lang').value;
}

// Modify the fetchWeather function to include language
async function fetchWeather(city) {
    const lang = getSelectedLanguage(); // Get selected language
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${isCelsius ? 'metric' : 'imperial'}&lang=${lang}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
            fetchForecast(city); // Fetch forecasts
            fetchAirQuality(data.coord.lat, data.coord.lon); // Fetch air quality
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        alert('An error occurred while fetching weather data.');
    }
}

// Modify the fetchForecast function to include language
async function fetchForecast(city) {
    const lang = getSelectedLanguage(); // Get selected language
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${isCelsius ? 'metric' : 'imperial'}&lang=${lang}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '200') {
        displayHourlyForecast(data);
        displayDailyForecast(data);
    }
}
