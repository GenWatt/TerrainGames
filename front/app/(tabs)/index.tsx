import { View } from 'react-native';
import Map from '@/features/map/components/Map';
import useTrips from "@/features/trips/api/useTrips";
import TripDetails from '@/features/map/components/TripDetails';
import { useTripStore } from '@/features/shared/stores/TripStore';

export default function HomeScreen() {
  const { trips } = useTrips();
  const { selectedTrip, deselectTrip } = useTripStore();

  return (
    <View className='flex-1 w-full h-full'>

      <Map trips={trips} />
      {selectedTrip && <TripDetails trip={selectedTrip} onClose={deselectTrip} />}
    </View>
  );
}