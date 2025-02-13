import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import useAuth from "../hooks/useAuth";
import useMe from "../api/useMe";

export interface AuthProps {
    children: React.ReactNode;
}

function Auth({ children }: AuthProps) {
    const { isLoggedIn } = useUserStore();
    const { logoutAsync } = useAuth();
    const { user, isLoading } = useMe();

    const handleLogout = async () => {
        await logoutAsync();
    }

    useEffect(() => {
        if (!isLoggedIn && !isLoading) handleLogout();
    }, [isLoggedIn])

    return children;
}

export default Auth