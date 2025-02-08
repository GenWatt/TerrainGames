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

    const loginMutation = useMutation({
        mutationFn: login,
        async onSuccess(data, variables, context) {
            const { data: userData } = data.data;

            await setObjectAsync('user', userData);
            queryClient.invalidateQueries({ queryKey: ['me'] });
            router.push({ pathname: '/(tabs)' });
            console.log('Query client');

        }
    })

    const loginAsync = async (loginData: ILoginForm) => {
        await loginMutation.mutateAsync(loginData);
    }

    return { loginAsync, loginMutation }
}

export default useLoginMutation