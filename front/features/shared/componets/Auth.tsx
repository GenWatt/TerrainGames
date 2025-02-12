import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import useAuth from "../hooks/useAuth";

export interface AuthProps {
    children: React.ReactNode;
}

function Auth({ children }: AuthProps) {
    const { isLoggedIn } = useUserStore();
    const { logoutAsync } = useAuth();

    const handleLogout = async () => {
        await logoutAsync();
    }

    useEffect(() => {
        if (!isLoggedIn) handleLogout();
    }, [isLoggedIn])

    return children;
}

export default Auth