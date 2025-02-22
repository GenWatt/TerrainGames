import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useRouterStore } from "../stores/routerStore";
import { useTripStore, AppModes } from "../stores/TripStore";
import { queryClient } from "./queryClient";

export const logoutAsyncUser = async () => {
    useTripStore.getState().changeMode(AppModes.VIEW);
    await AsyncStorage.removeItem('user');
    queryClient.cancelQueries();
    queryClient.clear();

    if (useRouterStore.getState().currentPath !== '/auth/login') {
        console.log('logoutAsyncUser111');
        router.navigate('/auth/login');
    }
}