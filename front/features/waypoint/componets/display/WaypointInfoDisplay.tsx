import { IWaypoint } from "@/features/shared/stores/createTripStore"
import { View, Text } from "react-native"

export interface WaypointInfoDisplayProps {
    waypoint: IWaypoint
}

function WaypointInfoDisplay({ waypoint }: WaypointInfoDisplayProps) {
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
}

export default WaypointInfoDisplay