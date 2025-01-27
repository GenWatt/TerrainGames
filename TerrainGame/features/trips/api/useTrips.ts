import { useQuery } from '@tanstack/react-query'
import useError from '@/features/shared/hooks/useError'
import { landMarkApi } from '@/features/shared/api';
import { ITrip } from '@/features/shared/stores/createTripStore';
import { IApiResult } from '@/types';
import { AxiosResponse } from 'axios';

export const getAllTrips = async (): Promise<AxiosResponse<IApiResult<ITrip[]>, IApiResult>> => {
    return await landMarkApi.get('/trip');
}


function useTrips() {
    const { handleError } = useError()

    const { data, error, isLoading } = useQuery({
        queryKey: ['trips'],
        queryFn: getAllTrips,
        retry: 0,
    })

    handleError(error)

    const trips = data?.data.data || []

    return { trips, error, isLoading }
}

export default useTrips