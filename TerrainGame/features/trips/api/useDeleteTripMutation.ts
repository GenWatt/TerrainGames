import { deleteTrip } from "@/api/trip"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function useDeleteTripMutation() {
    const { mutateAsync, data, error } = useMutation({
        mutationFn: deleteTrip,
    })

    const queryClient = useQueryClient()

    const deleteAction = async (id: string) => {
        await mutateAsync(id)
        queryClient.invalidateQueries({ queryKey: ['trips'] });
    }

    return { deleteAction, data, error }

}

export default useDeleteTripMutation