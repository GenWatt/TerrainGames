import { View } from 'react-native';
import Map from '@/features/map/components/Map';
import useTrips from "@/features/trips/api/useTrips";
import TripDetails from '@/features/map/components/TripDetails';
import { useTripStore } from '@/features/shared/stores/TripStore';
import { useCreateTripStore } from '@/features/shared/stores/createTripStore';
import ActiveTripBoard from '@/features/trips/components/ActiveTripBoard';
import useFeatureFlags from '@/features/shared/hooks/useFeatureFlags';
import { OtherFeatures } from '@/features/shared/types';

export default function HomeScreen() {
  const { trips } = useTrips();
  const { selectedTrip, deselectTrip } = useTripStore();
  const { trip: editedTrip } = useCreateTripStore();
  const { isFeatureAvailable } = useFeatureFlags();

  const tripToDraw = selectedTrip || editedTrip;

  return (
    <View className='flex-1 w-full h-full'>

      {/* if is active trip mode */}
      {isFeatureAvailable(OtherFeatures.TRIP_ACTIVE_VIEW) && selectedTrip && <ActiveTripBoard trip={selectedTrip} />}

      <Map trips={trips} selectedTrip={tripToDraw} />
      {selectedTrip && <TripDetails trip={selectedTrip} onClose={deselectTrip} />}
    </View>
  );
}