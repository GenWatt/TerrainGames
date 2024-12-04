import { deleteTrip } from "@/api/trip"
import useError from "@/hooks/useError"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function useDeleteTripMutation() {
    const { handleError } = useError()
    const { mutateAsync, data, error } = useMutation({
        mutationFn: deleteTrip,
    })

    handleError(error)

    const queryClient = useQueryClient()

    const deleteAction = async (id: string) => {
        await mutateAsync(id)
        queryClient.invalidateQueries({ queryKey: ['trips'] });
    }

    return { deleteAction, data, error }

}

export default useDeleteTripMutation