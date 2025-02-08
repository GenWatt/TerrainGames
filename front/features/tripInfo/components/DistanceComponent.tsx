
import { ITrip } from "@/features/shared/stores/createTripStore";
import { View, Text } from "react-native";
import useDistanceComponent from "../hooks/useDistanceComponent";

export interface DistanceCounterProps {
    trip: ITrip;
}

function DistanceCounter({ trip }: DistanceCounterProps) {
    const { totalDistance } = useDistanceComponent({ trip });

    return (
        <View className='p-2'>
            <Text className='text-foreground2 font-bold text-xl text-wrap text-center'>
                Total Distance
            </Text>
            <Text className='text-primary font-bold text-2xl text-wrap text-center'>
                {totalDistance}
            </Text>
        </View>
    );
}

export default DistanceCounter;