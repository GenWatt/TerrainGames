import { login, register } from "@/api/auth";
import { ILoginForm, IRegisterForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import useStorage from "./useStorage";
import { AxiosError } from "axios";

export default function useAuth() {
    const router = useRouter();

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess(data, variables, context) {
            router.push({ pathname: '/auth/login', params: {} });
        },
        onError(error: AxiosError, variables, context) {
            console.log('error', error.response?.data);
        }
    });

    const { setObjectAsync } = useStorage();

    const loginMutation = useMutation({
        mutationFn: login,
        async onSuccess(data, variables, context) {
            console.log('data', data.data);
            await setObjectAsync('user', data.data);
            router.push({ pathname: '/(tabs)' });
        },
        onError(error, variables, context) {
            console.log('error', error.message);
        }
    })

    const registerAsync = async (registerData: IRegisterForm) => {
        await registerMutation.mutateAsync(registerData);
    }

    const loginAsync = async (loginData: ILoginForm) => {
        await loginMutation.mutateAsync(loginData);
    }

    return {
        registerAsync,
        registerMutation,
        loginAsync,
        loginMutation,
    }
}