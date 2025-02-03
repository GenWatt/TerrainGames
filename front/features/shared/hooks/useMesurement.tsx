import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position"
import useMe from "../api/useMe"

function useMesurement() {
    const { user } = useMe()

    const getTotalTripDistance = (waypoints: Position[]) => {
        const totalDistance = waypoints.reduce((acc, waypoint, index) => {
            if (index === waypoints.length - 1) return acc

            const distance = getDistanceToWaypoint(waypoint, waypoints[index + 1])
            return acc + distance
        }, 0)

        return Math.round(totalDistance)
    }

    const getDistanceToWaypoint = (location: Position, destination: Position) => {
        const R = 6371e3; // metres r
        const a1 = location[1] * Math.PI / 180;
        const a2 = destination[1] * Math.PI / 180;
        const da1 = (destination[1] - location[1]) * Math.PI / 180;
        const da2 = (destination[0] - location[0]) * Math.PI / 180;

        const a = Math.sin(da1 / 2) * Math.sin(da1 / 2) +
            Math.cos(a1) * Math.cos(a2) *
            Math.sin(da2 / 2) * Math.sin(da2 / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // in metres
    }

    return {
        getTotalTripDistance,
        getDistanceToWaypoint
    }
}

export default useMesurement