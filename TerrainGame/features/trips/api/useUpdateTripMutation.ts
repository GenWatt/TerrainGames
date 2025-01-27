import { landMarkApi } from "@/features/shared/api";
import useError from "@/features/shared/hooks/useError"
import { ITrip } from "@/features/shared/stores/createTripStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const updateTrip = async (trip: ITrip) => {
    console.log('updateTrip', trip._id);
    return await landMarkApi.put(`/trip/${trip._id}`, { trip });
}

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