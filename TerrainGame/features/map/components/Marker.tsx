import { View, Text } from 'react-native'
import Mapbox from "@rnmapbox/maps";
import { useCreateTripStore, Waypoint } from '@/store/createTripStore';

export interface MarkerProps {
    index: number;
    waypoint: Waypoint;
}

export default function Marker({ index, waypoint }: MarkerProps) {
    const selectWaypoint = useCreateTripStore((state) => state.selectWaypoint);

    const handleSelect = (payload: GeoJSON.Feature) => {
        console.log('handleSelect', payload);
        selectWaypoint(waypoint);
    }

    const handleDeselect = () => {
        console.log('handleDeselect');
        selectWaypoint(null);
    }

    return (
        <Mapbox.PointAnnotation
            key={index.toFixed()}
            id={index.toString()}
            coordinate={waypoint.position}
            onSelected={handleSelect}
            onDeselected={handleDeselect}
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