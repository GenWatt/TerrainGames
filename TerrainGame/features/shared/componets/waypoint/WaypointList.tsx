import { Waypoint } from "@/store/createTripStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { View, Text } from "react-native"

export interface WaypointListProps {
    waypoints: Waypoint[]
}

function WaypointList({ waypoints }: WaypointListProps) {
    return (
        <View className="flex-row">
            {waypoints.map((waypoint, index) => (
                <View
                    key={waypoint._id}
                    className="flex-row items-center mb-1"
                >
                    <Text className="text-sm text-foreground2">
                        {waypoint.title}
                    </Text>
                    {index !== waypoints.length - 1 && (
                        <Ionicons
                            color="#9ca3af"
                            className="mx-2"
                            size={16}
                            name="arrow-forward"
                        />
                    )}
                </View>
            ))}
        </View>
    )
}

export default WaypointList