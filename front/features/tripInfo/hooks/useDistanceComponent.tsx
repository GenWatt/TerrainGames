import useConverter from '@/features/shared/hooks/useConverter';
import useMesurement from '@/features/shared/hooks/useMesurement';
import useUserLocation from '@/features/shared/hooks/useUserLocation';
import { ITrip } from '@/features/shared/stores/createTripStore';
import { useMemo } from 'react';

export interface DistanceHookProps {
    trip: ITrip;
}

function useDistanceComponent({ trip }: DistanceHookProps) {
    const { getTotalTripDistance } = useMesurement();
    const { userLocation } = useUserLocation();
    const { formatDistanceString } = useConverter();

    const waypoints = useMemo(() => {
        if (userLocation) {
            return [[userLocation.longitude, userLocation.latitude], ...trip.waypoints.map(waypoint => waypoint.position.coordinates)];
        }
        return [];
    }, [userLocation, trip.waypoints]);

    const totalDistance = useMemo(() => {
        const totalTripDistance = getTotalTripDistance(waypoints);
        return formatDistanceString(totalTripDistance);
    }, [waypoints, getTotalTripDistance]);

    return {
        waypoints,
        totalDistance
    }
}

export default useDistanceComponent