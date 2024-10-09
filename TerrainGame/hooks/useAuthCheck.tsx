import { useEffect } from 'react';
import { useRootNavigationState, useRouter } from 'expo-router';
import useStorage from './useStorage';

export function useAuthCheck() {
    const router = useRouter();
    const rootNavigationState = useRootNavigationState();
    const { getObjectAsync, removeItemAsync } = useStorage();

    useEffect(() => {
        async function checkLogin() {
            const savedUser = await getObjectAsync('user');

            if (!rootNavigationState?.key) return;
            console.log('rootNavigationState', rootNavigationState.key, savedUser);
            if (savedUser) {
                router.replace('/(tabs)');
            } else {
                await removeItemAsync('user');
                router.replace('/auth/login');
            }
        }

        checkLogin();
    }, [!rootNavigationState?.key]);
}