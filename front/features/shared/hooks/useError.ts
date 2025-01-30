import axios, { AxiosError } from 'axios';
import { useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';
import { ApiError, ResultTypes } from '@/types';
import useAuth from './useAuth';

export default function useError() {
    const segments = useSegments();
    const { logoutAsync } = useAuth();

    const handleError = (error: any) => {
        if (!error) {
            return;
        }

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiError>;
            const errorData = axiosError.response?.data;


            if (errorData?.type === ResultTypes.NOT_AUTHORIZED) {
                if (segments[0] === 'auth') return;

                console.log('not authorized!!!');
                logoutAsync();

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