import { landMarkApi } from "@/features/shared/api";
import useError from "@/features/shared/hooks/useError"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const deleteTrip = async (tripId: string) => {
    return await landMarkApi.delete(`/trip/${tripId}`);
}

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