import { landMarkApi } from "@/features/shared/api";
import useError from "@/features/shared/hooks/useError";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const changeMetric = async (metric: string) => {
    return await landMarkApi.put(`/settings/metric`, { metric });
}

function useChangeMetricMutation() {
    const { handleError } = useError();
    const { mutateAsync, data, error } = useMutation({
        mutationFn: changeMetric,
    });

    handleError(error);

    const queryClient = useQueryClient();

    const changeMetricAsync = async (metric: string) => {
        await mutateAsync(metric);
        console.log('changeMetricAsync', metric);
        queryClient.invalidateQueries({ queryKey: ['me'] });
    }

    return { changeMetricAsync, data, error };
}

export default useChangeMetricMutation;