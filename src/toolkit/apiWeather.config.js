import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaCloud, FaCloudRain } from 'react-icons/fa';
const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCold, setIsCold] = useState(false);
    const [isHot, setIsHot] = useState(false);

    useEffect(() => {
        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const city = 'Ibiza';

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
        return <div>Loading...</div>;
    }

    if (!weather) {
        return <div>Unable to fetch weather data.</div>;
    } else 
    {
        console.log('Fetching weather data : ' + JSON.stringify(weather));
    }

    const getWeatherPhrase = () => {
        const description = weather.weather[0].description.toLowerCase();

        if (description.includes('clear')) {
            return 'Il fait soleil.';
        } else if (description.includes('clouds')) {
            return 'Le temps est nuageux.';
        } else if (description.includes('rain')) {
            return 'Il pleut.';
        } else {
            return 'Conditions météo inconnues.';
        }
    };
    return (
        <div>
            <h2>{weather.name}</h2>
            <p>La temperature est de : {weather.main.temp}°C</p>
            <p>{getWeatherPhrase()}</p>
            {weather.weather[0].description.includes('clear') && (
                <FaSun size="70px" color='yellow' />
            )}
            {weather.weather[0].description.includes('clouds') && (
                <FaCloud size="70px" color='grey'/>
            )}
            {weather.weather[0].description.includes('rain') && (
                <FaCloudRain size="70px" color='grey'/>
            )}
            {isCold && <p style={{ color: 'cyan', fontWeight: 'bold', fontSize: '20px' }}>La température est trop fraîche, prends un vin chaud.</p>}
            {isHot && <p style={textHotWeather}>La température est chaude, prends tes boules et un ricard.</p>}
        </div>
    );
};

const textHotWeather = {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '20px',
}

export default Weather;
