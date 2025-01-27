import { landMarkApi } from "@/features/shared/api";
import { IRegisterForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const register = async (loginData: IRegisterForm) => {
    return await landMarkApi.post('/auth/registerUser', loginData);
}

function useRegisterMutation() {
    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess(data, variables, context) {
            router.push({ pathname: '/auth/login', params: {} });
        },
    });


    const registerAsync = async (registerData: IRegisterForm) => {
        await registerMutation.mutateAsync(registerData);
    }

    return { registerAsync, registerMutation }
}

export default useRegisterMutation