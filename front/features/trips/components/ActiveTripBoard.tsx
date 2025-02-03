import useMesurement from '@/features/shared/hooks/useMesurement';
import useUserLocation from '@/features/shared/hooks/useUserLocation';
import { ITrip } from '@/features/shared/stores/createTripStore';
import { AppModes, useTripStore } from '@/features/shared/stores/TripStore';
import Stopwatch from '@/features/stoper/components/Stopwatch';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { View, Text } from 'react-native';

export interface ActiveTripBoardProps {
    trip: ITrip;
}

function ActiveTripBoard({ trip }: ActiveTripBoardProps) {
    const { changeMode, deselectTrip } = useTripStore()

    const handleStop = (time: number) => {
        changeMode(AppModes.VIEW);
        deselectTrip();
    }

    const handlePause = () => {
        changeMode(AppModes.PAUSE_TRIP);
    }

    const handlePlay = () => {
        changeMode(AppModes.ACTIVE_TRIP);
    }

    return (
        <>
            <DistanceCounter trip={trip} />
            <Stopwatch onStop={handleStop} onPause={handlePause} onPlay={handlePlay} startImmediately />
        </>
    );
}

export interface DistanceCounterProps {
    trip: ITrip;
}

function DistanceCounter({ trip }: DistanceCounterProps) {
    const { getTotalTripDistance } = useMesurement();
    const { userLocation } = useUserLocation();
    let waypoints: Position[] = []

    if (userLocation) {
        waypoints = [[userLocation.longitude, userLocation.latitude], ...trip.waypoints.map(waypoint => waypoint.position.coordinates)];
    }

    return (
        <View className='absolute top-2 left-2 bg-background/50 p-3 rounded-2xl z-10'>
            <Text className='text-foreground2 font-bold text-2xl'>Total Distance: {getTotalTripDistance(waypoints)} m</Text>
        </View>
    );
}

export default ActiveTripBoard;