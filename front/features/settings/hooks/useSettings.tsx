import useMe from "@/features/shared/api/useMe"
import useChangeMetricMutation from "../api/useChangeMetricMutation"
import { MetricType, Temperature, TemperatureUnit } from "@/types";
import useChangeTemperatureMutation from "../api/useChangeTemperatureMutation";

function useSettings() {
    const { changeMetricAsync } = useChangeMetricMutation()
    const { changeTemperatureUnitAsync } = useChangeTemperatureMutation()
    const { user, isFetching } = useMe()

    const changeMetric = async () => {
        const newMetric = user?.prefs.metricSystem === MetricType.IMPERIAL ? MetricType.METRIC : MetricType.IMPERIAL
        await changeMetricAsync(newMetric)
    }

    const changeTemperatureUnit = async () => {
        const newUnit = user?.prefs.temperatureUnit === Temperature.CELSIUS ? Temperature.FAHRENHEIT : Temperature.CELSIUS
        await changeTemperatureUnitAsync(newUnit)
    }

    const currentTempUnit = user?.prefs.temperatureUnit === Temperature.CELSIUS ? TemperatureUnit.CELSIUS : TemperatureUnit.FAHRENHEIT

    return { changeMetric, user, isFetching, changeTemperatureUnit, currentTempUnit }
}

export default useSettings