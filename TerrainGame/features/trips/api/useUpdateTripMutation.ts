import { updateTrip } from "@/api/trip"
import useError from "@/hooks/useError"
import { ITrip } from "@/store/createTripStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function useUpdateTripMutation() {
    const { handleError } = useError()
    const { mutateAsync, data, error } = useMutation({
        mutationFn: updateTrip,
    })

    handleError(error)

    const queryClient = useQueryClient()

    const updateAction = async (trip: ITrip) => {
        await mutateAsync(trip)
        queryClient.invalidateQueries({ queryKey: ['trips'] });
    }

    return { updateAction, data, error }
}

export default useUpdateTripMutation