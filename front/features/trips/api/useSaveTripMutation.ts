import { landMarkApi } from "@/features/shared/api";
import { ITrip } from "@/features/shared/stores/createTripStore";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const saveTrip = async (trip: ITrip) => {
    return await landMarkApi.post('/trip', { trip });
}

function useSaveTripMutation() {
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['trips'] });
    }

    const { mutateAsync, ...rest } = useMutation({
        mutationFn: saveTrip,
        mutationKey: ['saveTrip'],
        onSuccess: handleSuccess
    })

    return { mutateAsync, ...rest }
}

export default useSaveTripMutation