import axios, { AxiosError } from 'axios';
import { useRouter, useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';
import useStorage from './useStorage';
import { ApiError, ResultTypes } from '@/types';

export default function useError() {
    const router = useRouter();
    const segments = useSegments();
    const { setObjectAsync } = useStorage();

    const handleError = (error: any) => {
        console.log('error', error);
        if (!error) {
            return;
        }

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiError>;
            const errorData = axiosError.response?.data;

            console.log('errorData', errorData);

            if (errorData?.type === ResultTypes.NOT_AUTHORIZED) {
                if (segments[0] === 'auth') return;

                console.log('not authorized!!!');
                router.push({ pathname: "/auth/login", params: {} });
                setObjectAsync('user', null);

                return;
            }

            if (errorData?.type === ResultTypes.INVALID_CREDENTIALS) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid credentials',
                    text2: 'Please try again',
                });

                return;
            }

            if (errorData?.type === ResultTypes.VALIDATION_ERROR) {
                Toast.show({
                    type: 'error',
                    text1: 'Validation error',
                    text2: 'Please check your input',
                });

                return;
            }
        }

        Toast.show({
            type: 'error',
            text1: 'An error occurred',
            text2: 'Please try again',
        });
    }

    const getErrorMessage = (error: any) => {
        if (axios.isAxiosError(error)) {
            return error.response?.data.message;
        }

        return 'An error occurred'
    };

    return { handleError, getErrorMessage };
}