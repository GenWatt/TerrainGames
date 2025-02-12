import { useQuery } from '@tanstack/react-query'
import { landMarkApi } from '@/features/shared/api';
import { ITrip } from '@/features/shared/stores/createTripStore';
import { IApiResult } from '@/types';
import { AxiosResponse } from 'axios';

export const getAllTrips = async (): Promise<AxiosResponse<IApiResult<ITrip[]>, IApiResult>> => {
    return await landMarkApi.get('/trip');
}

function useTrips() {
    const { data, ...rest } = useQuery({
        queryKey: ["trips"],
        queryFn: getAllTrips,
    })

    const trips = data?.data.data || []

    return { trips, ...rest }
}

export default useTrips