
import { IApiResult, IUser } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_LANDMARK_LEGENDS_API_URL;

export const landMarkApi = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

landMarkApi.interceptors.request.use(
    async (config) => {
        const savedUser = await AsyncStorage.getItem('user');
        const user: IUser | null = savedUser ? JSON.parse(savedUser) : null;
        console.log('user', user);
        if (user) {
            console.log('user', user);
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

landMarkApi.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export const getError = (error: any) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data as AxiosError<IApiResult>;
    }
}



