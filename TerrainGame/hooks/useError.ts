import axios, { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import useStorage from './useStorage';
import { ApiError, ResultTypes } from '@/types';

export default function useError() {
    const router = useRouter();
    const { setObjectAsync } = useStorage();

    const handleError = (error: any) => {
        if (!error) {
            return;
        }

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiError>;
            const errorData = axiosError.response?.data;

            if (errorData?.type === ResultTypes.NOT_AUTHORIZED) {
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

    return { handleError };
}