import { landMarkApi } from "@/features/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const deleteTrip = async (tripId: string) => {
    return await landMarkApi.delete(`/trip/${tripId}`);
}

function useDeleteTripMutation() {
    const queryClient = useQueryClient()

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['trips'] });
    }

    const { mutateAsync, ...rest } = useMutation({
        mutationFn: deleteTrip,
        mutationKey: ['deleteTrip'],
        onSuccess: handleSuccess
    })

    const deleteAction = async (id: string) => {
        await mutateAsync(id)
    }

    return { deleteAction, ...rest }
}

export default useDeleteTripMutation