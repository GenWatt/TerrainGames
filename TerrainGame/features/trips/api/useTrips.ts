import { useQuery } from '@tanstack/react-query'
import { getAllTrips } from '../../../api/trip'
import useError from '@/hooks/useError'

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