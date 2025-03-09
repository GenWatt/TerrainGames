import { View } from 'react-native';
import Map from '@/features/map/components/Map';
import useTrips from "@/features/trips/api/useTrips";
import TripDetails, { CloseSheetReason } from '@/features/map/components/TripDetails';
import { useTripStore } from '@/features/shared/stores/TripStore';
import { IWaypoint, useCreateTripStore } from '@/features/shared/stores/createTripStore';
import ActiveTripBoard from '@/features/trips/components/ActiveTripBoard';
import useFeatureFlags from '@/features/shared/hooks/useFeatureFlags';
import { OtherFeatures } from '@/features/shared/types';
import useDrawRoadMutation from '@/features/map/api/useDrawRoadMutation';
import { useEffect } from 'react';
import useUserLocation, { UserLocation } from '@/features/shared/hooks/useUserLocation';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export default function HomeScreen() {
  const { trips } = useTrips();
  const { selectedTrip, deselectTrip } = useTripStore();
  const { trip: editedTrip } = useCreateTripStore();
  const { isFeatureAvailable } = useFeatureFlags();
  const { road, fetchRoad, reset } = useDrawRoadMutation();
  const { userLocation } = useUserLocation();

  const tripToDraw = selectedTrip || editedTrip;

  const getWaypointsWithUserLocation = (waypoints: IWaypoint[], userLocation: UserLocation | undefined) => {
    if (userLocation) {
      return waypoints
        .map(waypoint => waypoint.position.coordinates)
        .concat([[userLocation.longitude, userLocation.latitude]]);
    }

    return [];
  }

  useEffect(() => {
    if (selectedTrip && userLocation) {
      const waypoints: Position[] = getWaypointsWithUserLocation(selectedTrip.waypoints, userLocation);

      fetchRoad(waypoints);
    } else if (!selectedTrip) {
      reset();
    }
  }, [selectedTrip, userLocation]);

  const handleClose = (reason: CloseSheetReason) => {
    if (reason !== CloseSheetReason.START) {
      deselectTrip(reason !== CloseSheetReason.CLOSE);
      reset();
    }
  }

  return (
    <View className='flex-1 w-full h-full'>

      {/* if is active trip mode */}
      {isFeatureAvailable(OtherFeatures.TRIP_ACTIVE_VIEW) && selectedTrip && <ActiveTripBoard road={road} trip={selectedTrip} />}

      <Map trips={trips} selectedTrip={tripToDraw} road={road} />
      {selectedTrip && <TripDetails trip={selectedTrip} onClose={handleClose} />}
    </View>
  );
}