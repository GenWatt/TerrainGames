import { login, register } from "@/api/auth";
import { ILoginForm, IRegisterForm, UserRole } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import useStorage from "./useStorage";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/userStore";

export default function useAuth() {
    const router = useRouter();
    const setUser = useUserStore(state => state.setUser);
    const logoutAction = useUserStore(state => state.logout);

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
            setUser(data.data);
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

    const logout = async () => {
        await setObjectAsync('user', null);
        logoutAction();
        router.push({ pathname: '/auth/login', params: {} });
    }

    return {
        registerAsync,
        registerMutation,
        loginAsync,
        loginMutation,
        logout
    }
}