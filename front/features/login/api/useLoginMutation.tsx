import { landMarkApi } from "@/features/shared/api";
import useStorage from "@/features/shared/hooks/useStorage";
import { ILoginForm, IApiResult, IUser } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { router } from "expo-router";

export const login = async (loginData: ILoginForm): Promise<AxiosResponse<IApiResult<IUser>, IApiResult>> => {
    return await landMarkApi.post('/auth/login', loginData);
}

function useLoginMutation() {
    const { setObjectAsync } = useStorage();
    const queryClient = useQueryClient();

    const handleSuccess = (data: AxiosResponse<IApiResult<IUser>, IApiResult>) => {
        const { data: userData } = data.data;

        setObjectAsync('user', userData);
        queryClient.invalidateQueries({ queryKey: ['me'] });
        router.push({ pathname: '/(tabs)' });
    }

    const loginMutation = useMutation({
        mutationFn: login,
        mutationKey: ['login'],
        onSuccess: handleSuccess
    })

    const loginAsync = async (loginData: ILoginForm) => {
        await loginMutation.mutateAsync(loginData);
    }

    return { loginAsync, loginMutation }
}

export default useLoginMutation