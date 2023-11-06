import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaSun, FaCloud, FaCloudRain, FaCloudSun} from 'react-icons/fa';

import './apiWeather.css';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCold, setIsCold] = useState(false);
    const [isHot, setIsHot] = useState(false);


    useEffect(() => {
        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const city = 'Rhône';

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfa3b392576d2146b7826925ebddf0e9&units=metric`)
            .then((response) => {
                setWeather(response.data);
                setIsCold(response.data.main.temp < 20);
                setIsHot(response.data.main.temp > 20);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!weather) {
        return <div>Unable to fetch weather data.</div>;
    } else 
    {
        console.log('Fetching weather data : ' + JSON.stringify(weather));
    }

    var iconcode = weather.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    return (
        <div className="weather-container">
            <div className="weather-header">
                <h2>{weather.name}</h2>
                <div className="weather-info">
                    <div className="weather-icon">
                        <img src={iconurl} alt="Weather Icon"/>
                    </div>
                    <div className="weather-details">
                        <p> {weather.main.temp}°C </p>
                        {isCold && <p>La température est fin fraîche, prends un vin chaud.</p>}
                        {isHot && <p>La température est franc élevé, prends tes boules et un pastis bien frais.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
