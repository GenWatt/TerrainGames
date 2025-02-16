import { landMarkApi } from "@/features/shared/api"
import { MapboxRoadType } from "@/features/shared/stores/createTripStore"
import { IApiResult } from "@/types";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import { useMutation } from "@tanstack/react-query"

const drawRoadAsync = async (waypoints: Position[]): Promise<IApiResult<MapboxRoadType>> => {
    const response = await landMarkApi.post('/trip/draw-road', { waypoints });
    return response.data;
}

function useDrawRoadMutation() {
    const { data, mutateAsync, ...rest } = useMutation({
        mutationKey: ['drawRoad'],
        mutationFn: drawRoadAsync,
    })

    const fetchRoad = async (waypoints: Position[]) => {
        if (waypoints.length > 1) {
            await mutateAsync(waypoints);
        }
    }

    const road = data?.data;

    return { fetchRoad, road, ...rest }
}

export default useDrawRoadMutation