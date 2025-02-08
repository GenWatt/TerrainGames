import { ITrip } from '@/features/shared/stores/createTripStore';
import { AppModes, useTripStore } from '@/features/shared/stores/TripStore';
import Slider from '@/features/slider/components/Slider';
import Stopwatch from '@/features/stoper/components/Stopwatch';
import DistanceComponent from '@/features/tripInfo/components/DistanceComponent';
import WeatherComponent from '@/features/tripInfo/components/WeatherComponent';

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
                width={SLIDER_WIDTH}
                canStop>

                <DistanceComponent trip={trip} />
                <WeatherComponent />
            </Slider>

            <Stopwatch onStop={handleStop} onPause={handlePause} onPlay={handlePlay} startImmediately />
        </>
    );
}


export default ActiveTripBoard;