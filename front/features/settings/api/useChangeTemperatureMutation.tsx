import { landMarkApi } from "@/features/shared/api";
import { Temperature } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const changeTemperaureUnit = async (unit: Temperature) => {
    return await landMarkApi.put(`/settings/temperatureUnit`, { unit });
}

function useChangeTemperatureMutation() {
    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['me'] });
    }

    const { mutateAsync, ...rest } = useMutation({
        mutationFn: changeTemperaureUnit,
        mutationKey: ['temperatureUnit'],
        onSuccess: handleSuccess
    });

    const queryClient = useQueryClient();

    const changeTemperatureUnitAsync = async (unit: Temperature) => {
        await mutateAsync(unit);
    }

    return { changeTemperatureUnitAsync, ...rest };
}

export default useChangeTemperatureMutation;