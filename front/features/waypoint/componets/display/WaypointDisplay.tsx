import { IWaypoint, WaypointTypes } from '@/features/shared/stores/createTripStore';
import WaypointInfoDisplay from './WaypointInfoDisplay';
import WaypointQuizDisplay from './WaypointQuizDisplay';

export interface WaypointDisplayProps {
    waypoint: IWaypoint;
}

const WaypointDisplay: React.FC<WaypointDisplayProps> = ({ waypoint }) => {
    return (
        <>
            {waypoint.type === WaypointTypes.INFO && <WaypointInfoDisplay waypoint={waypoint} />}
            {waypoint.type === WaypointTypes.QUIZ && <WaypointQuizDisplay waypoint={waypoint} />}
        </>
    )
};

export default WaypointDisplay;