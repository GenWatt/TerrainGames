import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useStorage() {
    const setObjectAsync = async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
    }

    const getObjectAsync = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e);
        }
    }

    const removeItemAsync = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error(e);
        }
    }

    return {
        setObjectAsync,
        getObjectAsync,
        removeItemAsync,
    }
}