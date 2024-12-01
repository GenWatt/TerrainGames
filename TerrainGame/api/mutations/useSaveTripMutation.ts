import { useMutation } from "@tanstack/react-query"
import { saveTrip } from "../trip"

function useSaveTripMutation() {
    const { mutateAsync, data, error } = useMutation({
        mutationFn: saveTrip,
    })

    return { mutateAsync, data, error }
}

export default useSaveTripMutation