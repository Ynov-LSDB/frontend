import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './apiWeather.css';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCold, setIsCold] = useState(false);
    const [isHot, setIsHot] = useState(false);


    useEffect(() => {
        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const city = 'Rhône';
        console.log(apiKey)
        console.log(apiKey)

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
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
        return (
            <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto w-full max-w-md">
                <p className="text-center text-lg">Chargement...</p>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto w-full max-w-md">
                <p className="text-center text-lg">Impossible de récupérer les données de la météo.</p>
            </div>
        );
    }


    var iconcode = weather.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    return (
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col items-center">
                <img src={iconurl} alt="Weather Icon" className="w-16 h-16"/>
            </div>
            <div className="flex-1 pl-4">
                <h2 className="font-semibold text-lg">{weather.name}</h2>
                <p className="text-xl">{parseFloat(weather.main.temp).toFixed(1)}°C</p>
                {isCold && <p className="text-sm">La température est fin fraîche, prends un vin chaud.</p>}
                {isHot && <p className="text-sm">La température est franc élevé, prends tes boules et un pastis bien frais.</p>}
            </div>
        </div>
    );
};

export default Weather;
