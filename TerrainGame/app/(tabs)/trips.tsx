import useTrips from '@/api/queries/useTrips';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function TripsScreen() {
    const { data } = useTrips();

    return (
        <ScrollView className="bg-background p-4">
            <View className="mb-4">
                <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-foreground">Trips</Text>
                    <Text className="text-primary ml-2">
                        Found ({data?.data.length} trips)
                    </Text>
                </View>
            </View>

            <View className='mb-4'>
                {data?.data.map((trip) => (
                    <View
                        key={trip._id}
                        className="bg-card rounded-2xl p-4 mb-4 shadow-md border-2 border-primary"
                    >
                        <Text className="text-lg font-semibold text-primary mb-1">
                            {trip.title}
                        </Text>
                        <Text className="text-sm text-foreground mb-3">
                            {trip.description}
                        </Text>

                        <View className="border-t border-gray-600 pt-2 flex-row">
                            {trip.waypoints.map((waypoint, index) => (
                                <View
                                    key={waypoint._id}
                                    className="flex-row items-center mb-1"
                                >
                                    <Text className="text-sm text-foreground2">
                                        {waypoint.title}
                                    </Text>
                                    {index !== trip.waypoints.length - 1 && (
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
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 5
    },
});
