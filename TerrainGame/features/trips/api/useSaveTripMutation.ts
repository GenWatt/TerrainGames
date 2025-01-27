import { landMarkApi } from "@/features/shared/api";
import { ITrip } from "@/features/shared/stores/createTripStore";
import { useMutation } from "@tanstack/react-query"

export const saveTrip = async (trip: ITrip) => {
    return await landMarkApi.post('/trip', { trip });
}


function useSaveTripMutation() {
    const { mutateAsync, data, error } = useMutation({
        mutationFn: saveTrip,
    })

    return { mutateAsync, data, error }
}

export default useSaveTripMutation