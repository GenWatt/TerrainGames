import { useRouter } from "expo-router";
import useStorage from "./useStorage";
import useLoginMutation from "@/features/login/api/useLoginMutation";
import useRegisterMutation from "@/features/register/api/useRegisterMutation";
import { useQueryClient } from "@tanstack/react-query";
import { AppModes, useTripStore } from "../stores/TripStore";

export default function useAuth() {
    const router = useRouter();
    const { setObjectAsync } = useStorage();

    const { loginAsync, loginMutation } = useLoginMutation();
    const { registerAsync, registerMutation } = useRegisterMutation();
    const queryClient = useQueryClient();
    const { changeMode } = useTripStore();

    const logoutAsync = async () => {
        await setObjectAsync('user', null);
        router.push({ pathname: '/auth/login', params: {} });
        queryClient.clear();
        changeMode(AppModes.VIEW);
    }

    return {
        registerAsync,
        registerMutation,
        loginAsync,
        loginMutation,
        logoutAsync
    }
}