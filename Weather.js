document.getElementById('fetch-weather-btn').addEventListener('click', fetchWeather);
document.getElementById('current-location-btn').addEventListener('click', fetchWeatherByLocation);

function fetchWeather() {
    const location = document.getElementById('location-input').value;
    const apiKey = '3045dd712ffe6e702e3245525ac7fa38';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert(`Location not found: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data.');
        });
}

function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiKey = '3045dd712ffe6e702e3245525ac7fa38';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.cod === 200) {
                        displayWeather(data);
                    } else {
                        alert(`Location not found: ${data.message}`);
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data.');
                });
        }, error => {
            alert('Unable to retrieve your location.');
            console.error('Error getting location:', error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;

    const weatherIconCode = data.weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

    const weatherIconElement = document.getElementById('weather-icon');
    weatherIconElement.src = weatherIconUrl;
    weatherIconElement.style.display = 'inline'; // Make the icon visible

    const conditionTextElement = document.getElementById('condition-text');
    conditionTextElement.textContent = `Conditions: ${data.weather[0].description}`;

    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity} %`;
}
