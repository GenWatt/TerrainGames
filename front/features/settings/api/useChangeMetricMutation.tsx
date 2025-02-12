import { landMarkApi } from "@/features/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const changeMetric = async (metric: string) => {
    return await landMarkApi.put(`/settings/metric`, { metric });
}

function useChangeMetricMutation() {
    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['me'] });
    }

    const { mutateAsync, ...rest } = useMutation({
        mutationFn: changeMetric,
        mutationKey: ['metric'],
        onSuccess: handleSuccess
    });

    const queryClient = useQueryClient();

    const changeMetricAsync = async (metric: string) => {
        await mutateAsync(metric);
    }

    return { changeMetricAsync, ...rest };
}

export default useChangeMetricMutation;