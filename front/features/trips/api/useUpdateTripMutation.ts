import { landMarkApi } from "@/features/shared/api";
import { ITrip } from "@/features/shared/stores/createTripStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const updateTrip = async (trip: ITrip) => {
    return await landMarkApi.put(`/trip/${trip._id}`, { trip });
}

function useUpdateTripMutation() {
    const queryClient = useQueryClient()

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['trips'] });
    }

    const { mutateAsync, ...rest } = useMutation({
        mutationFn: updateTrip,
        mutationKey: ['updateTrip'],
        onSuccess: handleSuccess
    })

    const updateAction = async (trip: ITrip) => {
        await mutateAsync(trip)
    }

    return { updateAction, ...rest }
}

export default useUpdateTripMutation