import { useQuery } from '@tanstack/react-query'
import { landMarkApi } from '@/features/shared/api';
import { ITrip } from '@/features/shared/stores/createTripStore';
import { IApiResult } from '@/types';
import { AxiosResponse } from 'axios';
import useFeatureFlags from '@/features/shared/hooks/useFeatureFlags';
import { OtherFeatures } from '@/features/shared/types';
import { useMapStore } from '@/features/map/store/MapStore';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export const getAllTrips = async ({ bounds }: { bounds: [Position, Position] }): Promise<AxiosResponse<IApiResult<ITrip[]>, IApiResult>> => {
    return await landMarkApi.get(`/trip?neLat=${bounds[0][1]}&neLng=${bounds[0][0]}&swLat=${bounds[1][1]}&swLng=${bounds[1][0]}`);
}

function useTrips() {
    const { isFeatureAvailable } = useFeatureFlags()
    const currentMapPosition = useMapStore(state => state.currentMapPosition)
    const viewportBounds = useMapStore(state => state.viewportBounds)

    const { data, ...rest } = useQuery({
        queryKey: ["trips", currentMapPosition, viewportBounds],
        queryFn: () => getAllTrips({ bounds: viewportBounds }),
        enabled: isFeatureAvailable(OtherFeatures.FETCH_TRIPS) && !!viewportBounds,
    })

    const trips = data?.data.data || []

    return { trips, ...rest }
}

export default useTrips