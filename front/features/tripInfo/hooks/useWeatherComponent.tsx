import useTemperatureConverter, { TemperatureValue } from "@/features/shared/hooks/useTemperatureConverter"
import { TemperatureUnit } from "@/types";

function useWeatherComponent() {
    const { formatTemperature, convertTemperature } = useTemperatureConverter()
    const temperature: TemperatureValue = { unit: TemperatureUnit.CELSIUS, value: 20 };

    const formateedTemperature = formatTemperature(convertTemperature(temperature))

    return { formateedTemperature }
}

export default useWeatherComponent