import { View, Text } from "react-native";
import useWeatherComponent from "../hooks/useWeatherComponent";
import { Temperature, TemperatureUnit } from "@/features/shared/hooks/useTemperatureConverter";

function WeatherComponent() {
    const { formatTemperature } = useWeatherComponent();
    const temperature: Temperature = { unit: TemperatureUnit.CELSIUS, value: 20 };

    return (
        <View>
            <Text className='text-foreground2 font-bold text-xl text-wrap text-center'>
                Jaworze
            </Text>
            <Text className='text-primary font-extrabold text-2xl text-wrap text-center'>
                {formatTemperature(temperature)}
            </Text>
        </View >
    );
}

export default WeatherComponent;