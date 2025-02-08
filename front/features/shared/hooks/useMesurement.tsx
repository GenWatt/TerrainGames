import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position"
import useConverter, { MetricUnit } from "./useConverter"

function useMesurement() {
    const { formatDistance, convertDistance } = useConverter()

    const getTotalTripDistance = (waypoints: Position[]) => {
        const totalDistance = waypoints.reduce((acc, waypoint, index) => {
            if (index === waypoints.length - 1) return acc

            const distance = getDistanceToWaypoint(waypoint, waypoints[index + 1])
            return { value: acc.value + distance.value, unit: distance.unit }
        }, { value: 0, unit: MetricUnit.METER })

        console.log('totalDistance', totalDistance)
        const formattedDistance = formatDistance(totalDistance)
        console.log('formattedDistance', formattedDistance)
        return formattedDistance
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
        console.log('c * R', R * c)
        const formattedDistance = convertDistance({ value: R * c, unit: MetricUnit.METER })

        return formattedDistance; // in metres
    }

    return {
        getTotalTripDistance,
        getDistanceToWaypoint
    }
}

export default useMesurement