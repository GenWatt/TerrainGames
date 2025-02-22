import useLoginMutation from "@/features/login/api/useLoginMutation";
import useRegisterMutation from "@/features/register/api/useRegisterMutation";
import { logoutAsyncUser } from "../utils/logoutUserAsync";

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