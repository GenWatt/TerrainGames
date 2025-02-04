import useMesurement from '@/features/shared/hooks/useMesurement';
import useUserLocation from '@/features/shared/hooks/useUserLocation';
import { ITrip } from '@/features/shared/stores/createTripStore';
import { AppModes, useTripStore } from '@/features/shared/stores/TripStore';
import Slider from '@/features/slider/components/Slider';
import Stopwatch from '@/features/stoper/components/Stopwatch';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { View, Text } from 'react-native';

export interface ActiveTripBoardProps {
    trip: ITrip;
}

const SLIDER_INTERVAL = 5000;
const SLIDER_WIDTH = 150;

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
            <Slider
                className='absolute top-2 left-2 overflow-hidden bg-background/50 rounded-2xl z-10'
                itemProps={{ className: 'p-2' }}
                sliderContainerProps={{ className: 'pt-1' }}
                interval={SLIDER_INTERVAL}
                width={SLIDER_WIDTH}>

                <DistanceCounter trip={trip} />
                <WeatherComponent />
            </Slider>

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
        <View className='p-2'>
            <Text className='text-foreground2 font-bold text-xl text-wrap text-center'>
                Total Distance
            </Text>
            <Text className='text-primary font-bold text-2xl text-wrap text-center'>
                {getTotalTripDistance(waypoints)} m
            </Text>
        </View>
    );
}


function WeatherComponent() {
    // Placeholder for the weather component
    return (
        <View>
            <Text className='text-foreground2 font-bold text-xl text-wrap text-center'>
                Jaworze
            </Text>
            <Text className='text-primary font-extrabold text-2xl text-wrap text-center'>
                12°C
            </Text>
        </View >
    );
}

export default ActiveTripBoard;