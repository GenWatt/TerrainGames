import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert, BackHandler, Linking } from 'react-native';
import { ILocation, ILocationService, LocationUpdate } from '../types';

export interface UserLocation {
    latitude: number;
    longitude: number;
}

let locationSubscription: Location.LocationSubscription | null = null;

export class RealLocationService {

    public init = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }
    }
}


export default function useUserLocation() {
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userLocation, setUserLocation] = useState<UserLocation>({ latitude: 49.82245, longitude: 19.04686 });
    const [isLocationLoading, setIsLocationLoading] = useState(true);

    const handleAccessDenied = () => {
        Alert.alert(
            "Permission Denied",
            "Location permission is required to use this app. The app will now exit.",
            [
                {
                    text: "Settings",
                    onPress: () => Linking.openSettings(),
                },
                {
                    text: "Exit",
                    onPress: () => BackHandler.exitApp(),
                },
            ],
            { cancelable: false }
        );
    }

    const handleAccessGranted = async () => {
        const location = await Location.getCurrentPositionAsync({});

        setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        setHasLocationPermission(true);
    }

    const handleLocationPermission = async () => {
        setIsLocationLoading(true);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
            await handleAccessGranted();
        } else {
            await handleAccessDenied();
        }

        setIsLocationLoading(false);
    }

    useEffect(() => {
        handleLocationPermission();
    }, []);

    const handleLocationSubscription = async () => {
        locationSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000, // Update every 10 seconds
                distanceInterval: 10, // Update every 10 meters
            },
            (location) => {
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }
        );
    }

    useEffect(() => {
        if (hasLocationPermission) {
            handleLocationSubscription();
        }

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, [hasLocationPermission]);

    return { hasLocationPermission, userLocation, handleLocationPermission, isLocationLoading };
}