import axios from "axios";

export const axiosMapboxDirectionsInstance = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox',
    timeout: 10000
});

axiosMapboxDirectionsInstance.interceptors.request.use((config) => {
    const separator = config.url?.includes('?') ? '&' : '?';
    config.url = `${config.url}${separator}access_token=${process.env.MAPBOX_ACCESS_TOKEN_PUBLIC}`;
    return config;
});
