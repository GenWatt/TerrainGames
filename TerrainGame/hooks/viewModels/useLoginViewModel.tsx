import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { AuthSessionRedirectUriOptions } from 'expo-auth-session/build/AuthSession.types';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '@/api/auth';

const { EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID, EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID, EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID } = process.env;

const googleConfig: Partial<Google.GoogleAuthRequestConfig> = {
    androidClientId: EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
};

const redirectedOptions: Partial<AuthSessionRedirectUriOptions> = {
    native: 'host.exp.terraingame://',
};

export default function useLoginViewModel() {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(googleConfig, redirectedOptions);
    const loginWithGoogleMutation = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess(data, variables, context) {
            console.log('datasad', data.data);
            AsyncStorage.setItem('user', JSON.stringify(data.data));
        },
        onError(error, variables, context) {
            console.log('error', error);
        }
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            handleSingInWithGoogle(id_token);
        }
    }, [response]);

    async function handleSingInWithGoogle(token: string) {
        const user = await AsyncStorage.getItem('user');

        if (user) {
            return;
        }

        await loginWithGoogleMutation.mutateAsync(token);
    }

    return {
        request,
        response,
        promptAsync,
    }
}