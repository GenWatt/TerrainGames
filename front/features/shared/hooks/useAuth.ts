import { router } from "expo-router";
import useLoginMutation from "@/features/login/api/useLoginMutation";
import useRegisterMutation from "@/features/register/api/useRegisterMutation";
import { AppModes, useTripStore } from "../stores/TripStore";
import { queryClient } from "@/app/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouterStore } from "../stores/routerStore";

export const logoutAsyncUser = async () => {
    useTripStore.getState().changeMode(AppModes.VIEW);
    await AsyncStorage.removeItem('user');
    queryClient.cancelQueries();
    queryClient.clear();

    if (useRouterStore.getState().currentPath !== '/auth/login') {
        console.log('logoutAsyncUser111');
        router.navigate('/auth/login');
    }
}

export default function useAuth() {
    const { loginAsync, loginMutation } = useLoginMutation();
    const { registerAsync, registerMutation } = useRegisterMutation();

    const logoutAsync = async () => {
        await logoutAsyncUser();
    }

    return {
        registerAsync,
        registerMutation,
        loginAsync,
        loginMutation,
        logoutAsync
    }
}