import { View, Text } from 'react-native'
import Mapbox from "@rnmapbox/maps";

export interface MarkerProps {
    index: number;
    position: number[];
}

export default function Marker({ index, position }: MarkerProps) {
    return (
        <Mapbox.PointAnnotation
            key={index.toFixed()}
            id={index.toString()}
            coordinate={position}
        >
            <View>
                <View className="bg-primary w-10 h-10 rounded-full shadow-lg shadow-primary justify-center items-center relative">
                    <Text className='text-darkForeground'>{index + 1}</Text>
                    <View className='w-5 h-5 bg-primary absolute top-7 left-0.5 rotate-90'></View>
                </View>
            </View>
        </Mapbox.PointAnnotation>
    )
}