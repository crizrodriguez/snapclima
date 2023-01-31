//Interação com usuario
const citySearchInput = document.getElementById('city-search-input');
const citybuttonSearch = document.getElementById('city-search-button');

//Exibição para usuario
const currentDate = document.getElementById('current-date');
const cityCurrentName = document.getElementById('current-name');
const currentWeatherIcon = document.getElementById('weather-icon');
const currentWeatherDescription = document.getElementById('weather-description');
const currentTemperature = document.getElementById('current-temperature');
const currentWindSpeed = document.getElementById('wind-speed');
const currentThermalSensation = document.getElementById('thermal-sensation');
const currentAirHumidity = document.getElementById('air-humidity');
const currentSunriseTime = document.getElementById('sunrise-time');
const currentSunsetTime = document.getElementById('sunset-time');

const api_key = "fd9598abae40c4a64e984258ec72dfa4";

citybuttonSearch.addEventListener('click', () => {
    let cityName = citySearchInput.value
    getCityWeather(cityName)
});


// permição pra rastrear a localização do usuario
navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        getCurrentLocationWeather(lat, lon)
    },
    (err) => {
        if (err.code === 1) {
            alert('Geocalização negada pelo usuario, busque manualmente por uma cidade  pela barra de psquisa')
        }else {
            console.log(err);
        }
        

    }
)

function getCurrentLocationWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
            .then((response) => response.json())
            .then((data) => displayWeather(data))
}

//https://api.openweathermap.org/data/2.5/weather?q$={city}&units=metric&lang=pt_br&appid=${API key}
// fetch = buscar informação na url
// .then = então, que significa então pegar a resposata da busca do fetch e converte a informação em 
// .json  = metodo pra linguagem do Java script entende a resposta do fetch
function getCityWeather(cityName) {

    currentWeatherIcon.src = `./assets/assets/assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}

//criar uma funçaõ e fazer a desestruturaçaõ do objeto que no caso é a response.json
function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ description, icon }],
        main: { humidity, temp, feels_like },
        wind: { speed },
        sys: { sunrise, sunset }
    } = data

    currentDate.textContent = formatDate(dt);
    cityCurrentName.textContent = name;

    currentWeatherDescription.textContent = description
    currentWeatherIcon.src = `./assets/assets/assets/${icon}.svg`

    currentTemperature.textContent = `${Math.round(temp)}C°`;
    currentWindSpeed.textContent = `${Math.round(speed * 3.6)} km/h`;
    currentThermalSensation.textContent = `${Math.round(feels_like)}C°`;
    currentAirHumidity.textContent = `${humidity}%`;
    currentSunriseTime.textContent = formatTime(sunrise);
    currentSunsetTime.textContent = formatTime(sunset);

}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000);  
    let formatDateBr =date.toLocaleDateString('pt-br', {dateStyle: 'long'})
    return `Hoje ${formatDateBr}`
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes(); 
    return `${hours}:${minutes}`;
}
