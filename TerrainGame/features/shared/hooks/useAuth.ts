import { useRouter } from "expo-router";
import useStorage from "./useStorage";
import useLoginMutation from "@/features/login/api/useLoginMutation";
import useRegisterMutation from "@/features/register/api/useRegisterMutation";

export default function useAuth() {
    const router = useRouter();
    const { setObjectAsync } = useStorage();

    const { loginAsync, loginMutation } = useLoginMutation();
    const { registerAsync, registerMutation } = useRegisterMutation();

    const logoutAsync = async () => {
        await setObjectAsync('user', null);
        router.push({ pathname: '/auth/login', params: {} });
    }

    return {
        registerAsync,
        registerMutation,
        loginAsync,
        loginMutation,
        logoutAsync
    }
}