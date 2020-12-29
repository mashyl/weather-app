import {WeekDay, updateToday, backgroundColor} from './DOM-helper.js';
import {cityToCoords, coordsToCity} from './convertLocation.js';
import {timestampToDate, chooseIcon} from './helpers.js'

const cityInput = document.querySelector('.city-input');
let cityList = document.getElementById('city-list');

const API_KEY = '7899365eb731d9029680a0fb8a81586e';

window.onload = () => {
    if(localStorage.getItem('cities')) {
        const cityArr = JSON.parse(localStorage.getItem('cities'));
        cityArr.forEach(element => {
                let opt = document.createElement('option');
                opt.setAttribute('value', `${element}`);
                cityList.appendChild(opt);
        });
    }

    if(!navigator.geolocation) {
            alert('Location feature is not available in your browser. Please use a more modern browser or enter address manually.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async successResult => {
                const coordinates = {
                    lat: successResult.coords.latitude,
                    lng: successResult.coords.longitude
                };
                const forecast = await getWeather(coordinates);
                backgroundColor();
                const city = await coordsToCity(coordinates);
                weatherHandler(city, forecast);
            }, 
            error => {
                alert(`Couldn't get your location.`)
            }
        );
}

function weatherHandler(city, forecast) {
    // console.dir(forecast);
    const desc = forecast.current.weather[0].description;
    const descMain = forecast.current.weather[0].main;
    const temp = Math.round(forecast.current.temp);

    //background
    const curTime = forecast.current.dt;
    const sunsetTime = forecast.current.sunset;
    const sunriseTime = forecast.current.sunrise;
    let isDay = (sunriseTime > curTime || curTime > sunsetTime) ? false : true;

    //id for icon current
    const idCurrent = forecast.current.weather[0].id;
    const currentIconSource = chooseIcon(idCurrent, isDay);

    updateToday(city, desc, descMain, currentIconSource, temp, isDay); 

    //week
    forecast.daily.forEach(el => {
        const day = timestampToDate(el.dt);
        const dailyTemp = Math.round(el.temp.day);
        const idDaily = el.weather[0].id;
        const dailyIconSource = chooseIcon(idDaily, true);
        const dayRow = new WeekDay(day, dailyIconSource, dailyTemp);
    });
}

cityInput.onchange = () => {
    let citySearch = cityInput.value;
    
    //data-list for cities
    if(localStorage.getItem('cities')) {
        const cityArr = JSON.parse(localStorage.getItem('cities'));
        if (cityArr.indexOf(citySearch) !== -1) {
            return;
        } else {
            cityArr.push(citySearch);
            localStorage.setItem('cities', JSON.stringify(cityArr));
            let opt = document.createElement('option');
            opt.setAttribute('value', `${citySearch}`);
            cityList.appendChild(opt);
        }
    } else {
        const cityArr = [];
        cityArr.push(citySearch);
        localStorage.setItem('cities', JSON.stringify(cityArr));
        let opt = document.createElement('option');
            opt.setAttribute('value', `${citySearch}`);
            cityList.appendChild(opt);
    }
}

cityInput.onsearch = async function() {
    const city = cityInput.value;
    const coords = await cityToCoords(city);
    const forecast = await getWeather(coords);
    weatherHandler(city, forecast);
};

async function getWeather(coords) {
    const lat = coords.lat;
    const lng = coords.lng;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`)
    if (!response.ok) {
        throw new Error('Request failed. Try again.')
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }
    return data;
}
