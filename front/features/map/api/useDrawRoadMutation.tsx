import { landMarkApi } from "@/features/shared/api"
import { IWaypoint, MapboxRoadType, useCreateTripStore } from "@/features/shared/stores/createTripStore"
import { IApiResult } from "@/types";
import { useMutation } from "@tanstack/react-query"

const drawRoadAsync = async (waypoints: IWaypoint[]): Promise<IApiResult<MapboxRoadType>> => {
    const response = await landMarkApi.post('/trip/draw-road', { waypoints });
    return response.data;
}

function useDrawRoadMutation() {
    const { setRoad } = useCreateTripStore();

    const handleSuccess = (response: IApiResult<MapboxRoadType>) => {
        if (response.data) {
            setRoad(response.data);
        }
    }

    const { mutateAsync, ...rest } = useMutation({
        mutationKey: ['drawRoad'],
        mutationFn: drawRoadAsync,
        onSuccess: handleSuccess
    })

    const fetchRoad = async (waypoints: IWaypoint[]) => {
        if (waypoints.length > 1) {
            await mutateAsync(waypoints);
        }
    }

    return { fetchRoad, ...rest }
}

export default useDrawRoadMutation