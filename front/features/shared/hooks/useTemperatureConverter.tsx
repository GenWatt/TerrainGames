import { Temperature, TemperatureUnit } from "@/types";
import useMe from "../api/useMe";

export type TemperatureValue = {
    unit: TemperatureUnit;
    value: number;
};

class TemperatureConverter {
    public constructor(private preferedUnit: Temperature) { }

    private isCelsiusPreferred(): boolean {
        return this.preferedUnit === Temperature.CELSIUS;
    }

    private isFahrenheitPreferred(): boolean {
        return this.preferedUnit === Temperature.FAHRENHEIT;
    }

    private isKelvinPreferred(): boolean {
        return this.preferedUnit === Temperature.KELVIN;
    }

    public convert(temp: TemperatureValue): TemperatureValue {
        if (this.isCelsiusPreferred()) {
            return this.toCelsius(temp);
        } else if (this.isFahrenheitPreferred()) {
            return this.toFahrenheit(temp);
        } else {
            return this.toKelvin(temp);
        }
    }

    private toCelsius(temp: TemperatureValue): TemperatureValue {
        if (temp.unit === TemperatureUnit.FAHRENHEIT) {
            return { value: (temp.value - 32) * (5 / 9), unit: TemperatureUnit.CELSIUS };
        } else if (temp.unit === TemperatureUnit.KELVIN) {
            return { value: temp.value - 273.15, unit: TemperatureUnit.CELSIUS };
        }
        return temp;
    }

    private toFahrenheit(temp: TemperatureValue): TemperatureValue {
        if (temp.unit === TemperatureUnit.CELSIUS) {
            return { value: temp.value * (9 / 5) + 32, unit: TemperatureUnit.FAHRENHEIT };
        } else if (temp.unit === TemperatureUnit.KELVIN) {
            return { value: (temp.value - 273.15) * (9 / 5) + 32, unit: TemperatureUnit.FAHRENHEIT };
        }
        return temp;
    }

    private toKelvin(temp: TemperatureValue): TemperatureValue {
        if (temp.unit === TemperatureUnit.CELSIUS) {
            return { value: temp.value + 273.15, unit: TemperatureUnit.KELVIN };
        } else if (temp.unit === TemperatureUnit.FAHRENHEIT) {
            return { value: (temp.value - 32) * (5 / 9) + 273.15, unit: TemperatureUnit.KELVIN };
        }
        return temp;
    }

    public format(temp: TemperatureValue): string {
        const formattedValue = Number.isInteger(temp.value) ? temp.value.toFixed(0) : temp.value.toFixed(1);
        return `${formattedValue} ${temp.unit}`;
    }
}

function useTemperatureConverter() {
    const { user } = useMe();
    const converter = new TemperatureConverter(user?.prefs.temperatureUnit || Temperature.CELSIUS);

    return {
        convertTemperature: (temp: TemperatureValue) => converter.convert(temp),
        formatTemperature: (temp: TemperatureValue) => converter.format(temp)
    };
}

export default useTemperatureConverter;