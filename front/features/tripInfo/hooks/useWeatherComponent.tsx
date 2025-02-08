import useTemperatureConverter from "@/features/shared/hooks/useTemperatureConverter"


function useWeatherComponent() {
    const { formatTemperature } = useTemperatureConverter()

    return { formatTemperature }
}

export default useWeatherComponent