import Loader from '@/components/ui/Loader';
import useTrips from '@/features/trips/api/useTrips';
import TripList from '@/features/trips/components/TripList';
import { View, Text, ScrollView } from 'react-native';

export default function TripsScreen() {
    const { trips, isLoading } = useTrips();

    return (
        <ScrollView className="bg-background p-4">
            <View className="mb-4">
                <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-foreground">Trips</Text>
                    {trips && <Text className="text-primary ml-2">
                        Found ({trips.length} trips)
                    </Text>}
                </View>
            </View>

            {trips && <TripList trips={trips} />}
            {isLoading && <Loader />}
        </ScrollView>
    );
}