import axios, { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import { ApiError, ResultTypes } from '@/types';
import { logoutAsyncUser } from '../utils/logoutUserAsync';

export const handleErrorFunction = async (error: any) => {
    if (!error) {
        return;
    }

    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        const errorData = axiosError.response?.data;

        if (errorData?.type === ResultTypes.NOT_AUTHORIZED) {
            console.log('User not authorized');
            await logoutAsyncUser();
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

        console.log('API error:', errorData?.message);
    }

    Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: 'Please try again',
    });
}

export default function useError() {
    const handleError = (error: any) => {
        handleErrorFunction(error);
    }

    const getErrorMessage = (error: any) => {
        if (axios.isAxiosError(error)) {
            return error.response?.data.message;
        }

        return 'An error occurred'
    };

    return { handleError, getErrorMessage };
}