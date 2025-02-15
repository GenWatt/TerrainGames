import { useEffect, useRef } from "react";
import { useUserStore } from "../stores/userStore";
import useAuth from "../hooks/useAuth";
import useMe from "../api/useMe";

export interface AuthProps {
    children: React.ReactNode;
}

function Auth({ children }: AuthProps) {
    const { isLoggedIn } = useUserStore();
    const { logoutAsync } = useAuth();
    const { isLoading } = useMe();

    const logoutTriggered = useRef(false);

    useEffect(() => {
        console.log('Auth effect');
        if (isLoading) return;

        if (!isLoggedIn && !logoutTriggered.current) {
            logoutTriggered.current = true;
            console.log('Logging out...', isLoggedIn);
            logoutAsync().finally(() => {
                logoutTriggered.current = false;
            });
        }
    }, [isLoggedIn]);


    return children;
}

export default Auth