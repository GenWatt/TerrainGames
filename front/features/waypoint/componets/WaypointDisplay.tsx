import { View, Text } from 'react-native';
import { IWaypoint } from '@/features/shared/stores/createTripStore';

export interface WaypointDisplayProps {
    waypoint: IWaypoint;
}

const WaypointDisplay: React.FC<WaypointDisplayProps> = ({ waypoint }) => {
    return (
        <View>
            <Text className='text-foreground p-2 text-md'>
                {waypoint.description}
            </Text>

            <Text className='text-foreground2 font-bold px-2 text-xl'>
                {waypoint.type}
            </Text>
        </View>
    )
};

export default WaypointDisplay;