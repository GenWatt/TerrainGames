import { View, Text } from "react-native";
import useWeatherComponent from "../hooks/useWeatherComponent";

function WeatherComponent() {
    const { formateedTemperature, weatherData } = useWeatherComponent();

    return (
        <View>
            <Text className='text-foreground2 font-bold text-xl text-wrap text-center'>
                Jaworze
            </Text>
            <Text className='text-primary font-extrabold text-2xl text-wrap text-center'>
                {formateedTemperature}
            </Text>
            <Text className='text-primary font-medium text-sm text-wrap text-center'>
                {weatherData?.weather[0].description}
            </Text>
        </View >
    );
}

export default WeatherComponent;