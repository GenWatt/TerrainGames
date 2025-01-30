import { IWaypoint } from "@/features/shared/stores/createTripStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { clsx } from "clsx"
import { View, Text, ViewProps } from "react-native"

export interface WaypointListProps extends ViewProps {
    waypoints: IWaypoint[]
}

function WaypointList({ waypoints, className, ...props }: WaypointListProps) {
    return (
        <View className={clsx("flex-row flex-wrap", className)} {...props}>
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