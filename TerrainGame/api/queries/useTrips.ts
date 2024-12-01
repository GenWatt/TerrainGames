import { useQuery } from '@tanstack/react-query'
import { getAllTrips } from '../trip'
import useError from '@/hooks/useError'

function useTrips() {
    const { handleError } = useError()

    const { data, error, isLoading } = useQuery({
        queryKey: ['trips'],
        queryFn: getAllTrips,
        retry: 0,
    })

    if (error) {
        handleError(error)
    }

    return { data, error, isLoading }
}

export default useTrips