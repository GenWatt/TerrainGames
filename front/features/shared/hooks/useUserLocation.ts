import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert, BackHandler, Linking } from 'react-native';
import { ILocation, ILocationService, LocationUpdate } from '../types';

export interface UserLocation {
    latitude: number;
    longitude: number;
}

let locationSubscription: Location.LocationSubscription | null = null;

export class RealLocationService implements ILocationService {
    private subscription: Location.LocationSubscription | null = null;

    async getCurrentLocation(): Promise<ILocation> {
        const location = await Location.getCurrentPositionAsync({});
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
    }

    async watchLocation(callback: (update: LocationUpdate) => void): Promise<() => void> {
        this.subscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 10,
            },
            (location) => {
                callback({
                    location: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                    speed: location.coords.speed || undefined,
                });
            }
        );

        return () => this.subscription?.remove();
    }

    // Not implemented for real service
    simulatePath() { }
    stopSimulation() { }
}
export class SimulatedLocationService implements ILocationService {
    private currentSimulation: NodeJS.Timeout | null = null;
    private currentPath: ILocation[] = [];
    private currentIndex = 0;
    private simulationSpeed = 1;
    private loop = false;

    async getCurrentLocation(): Promise<ILocation> {
        return this.currentPath[this.currentIndex] || { latitude: 0, longitude: 0 };
    }

    async watchLocation(callback: (update: LocationUpdate) => void, options?: { simulationSpeed?: number }): Promise<() => void> {
        this.simulationSpeed = options?.simulationSpeed || 1;
        return () => this.stopSimulation();
    }

    simulatePath(path: ILocation[], options?: { speed?: number; loop?: boolean }): void {
        this.currentPath = path;
        this.currentIndex = 0;
        this.simulationSpeed = options?.speed || 1;
        this.loop = options?.loop || false;

        this.startSimulation();
    }

    private startSimulation() {
        const interval = 1000 / this.simulationSpeed;

        this.currentSimulation = setInterval(() => {
            if (this.currentIndex < this.currentPath.length - 1) {
                this.currentIndex++;
            } else if (this.loop) {
                this.currentIndex = 0;
            } else {
                this.stopSimulation();
            }
        }, interval);
    }

    stopSimulation(): void {
        if (this.currentSimulation) {
            clearInterval(this.currentSimulation);
            this.currentSimulation = null;
        }
    }
}

export default function useUserLocation() {
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userLocation, setUserLocation] = useState<UserLocation>({ latitude: 0, longitude: 0 });

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
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
            handleAccessGranted();
        } else {
            handleAccessDenied();
        }
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

    return { hasLocationPermission, userLocation };
}