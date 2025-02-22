import useTemperatureConverter, { TemperatureValue } from "@/features/shared/hooks/useTemperatureConverter"
import { TemperatureUnit, WeatherData } from "@/types";
import useQueryWeather from "../api/useQueryWeather";
import useUserLocation from "@/features/shared/hooks/useUserLocation";
import { useMemo } from "react";

function useWeatherComponent() {
    const { formatTemperature, convertTemperature } = useTemperatureConverter()
    const { userLocation } = useUserLocation()
    const { weatherData } = useQueryWeather({ latitude: userLocation.latitude, longitude: userLocation.longitude })

    const calculateTemperature = (weatherData: WeatherData | undefined) => {
        const temperature: TemperatureValue = { unit: TemperatureUnit.KELVIN, value: weatherData?.main.temp || 0 };
        return formatTemperature(convertTemperature(temperature))
    }

    const formateedTemperature = useMemo(() => {
        return calculateTemperature(weatherData)
    }, [weatherData, calculateTemperature])

    return { formateedTemperature }
}

export default useWeatherComponent