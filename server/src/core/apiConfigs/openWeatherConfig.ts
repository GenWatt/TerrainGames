import axios from "axios";

export const axiosOpenWeatherInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosOpenWeatherInstance.interceptors.request.use((config) => {
    const separator = config.url?.includes('?') ? '&' : '?';
    config.url = `${config.url}${separator}appid=${process.env.WEATHER_API_KEY}`;
    return config;
});