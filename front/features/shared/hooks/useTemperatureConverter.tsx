import { MetricType } from "@/types";
import useMe from "../api/useMe";

export enum TemperatureUnit {
    CELSIUS = "°C",
    FAHRENHEIT = "°F"
}

export type Temperature = {
    unit: TemperatureUnit;
    value: number;
};

class TemperatureConverter {
    private userPrefs = useMe().user?.prefs.metricSystem;

    private isMetricPreferred(): boolean {
        return this.userPrefs === MetricType.METRIC;
    }

    public convert(temp: Temperature): Temperature {
        return this.isMetricPreferred() ? this.toCelsius(temp) : this.toFahrenheit(temp);
    }

    private toCelsius(temp: Temperature): Temperature {
        if (temp.unit === TemperatureUnit.FAHRENHEIT) {
            return { value: (temp.value - 32) * (5 / 9), unit: TemperatureUnit.CELSIUS };
        }
        return temp;
    }

    private toFahrenheit(temp: Temperature): Temperature {
        if (temp.unit === TemperatureUnit.CELSIUS) {
            return { value: temp.value * (9 / 5) + 32, unit: TemperatureUnit.FAHRENHEIT };
        }
        return temp;
    }

    public format(temp: Temperature): string {
        const formattedValue = Number.isInteger(temp.value) ? temp.value.toFixed(0) : temp.value.toFixed(1);
        return `${formattedValue} ${temp.unit}`;
    }
}

function useTemperatureConverter() {
    const converter = new TemperatureConverter();
    return {
        convertTemperature: (temp: Temperature) => converter.convert(temp),
        formatTemperature: (temp: Temperature) => converter.format(temp)
    };
}

export default useTemperatureConverter;
