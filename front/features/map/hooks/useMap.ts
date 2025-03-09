import Mapbox from "@rnmapbox/maps";
import { useCreateTripStore } from '@/features/shared/stores/createTripStore';
import { useMapStore } from "@/features/map/store/MapStore";
import useUserLocation from "@/features/shared/hooks/useUserLocation";
import { AppModes, useTripStore } from "@/features/shared/stores/TripStore";
import { OtherFeatures, ToolbarActionFeatures } from "@/features/shared/types";
import useFeatureFlags from "@/features/shared/hooks/useFeatureFlags";
import { useRef } from "react";
import { GestureResponderEvent } from "react-native";

function useMap() {
    const { hasLocationPermission, userLocation, handleLocationPermission } = useUserLocation();
    const { action: selectedAction, selectWaypoint, addPosition, isEditing } = useCreateTripStore((state) => state);
    const { changeMode } = useTripStore();
    const { isFeatureAvailable } = useFeatureFlags();

    const mapRef = useRef<Mapbox.MapView | null>(null);

    const { setMapCamera, setPositionAndBounds, camera: mapCamera } = useMapStore();

    const setBounds = async () => {
        if (mapRef.current) {
            const bounds = await mapRef.current.getVisibleBounds()
            const center = await mapRef.current.getCenter()

            setPositionAndBounds(center, bounds)
        }
    }

    const handleTouchEnd = async (_: GestureResponderEvent) => {
        await setBounds()
    }

    const handleMapLoaded = async () => {
        await setBounds()
    }

    const styleUrl = Mapbox.StyleURL.TrafficNight;

    const handlePress = (feature: GeoJSON.Feature) => {
        selectWaypoint(null);
        if (selectedAction === ToolbarActionFeatures.ADD_WAYPOINT && feature.geometry.type === 'Point') {
            addPosition(feature.geometry.coordinates);
            changeMode(AppModes.CREATE_TRIP);
        }
    }

    const handleMapRef = (camera: Mapbox.Camera | null) => {
        if (camera && !mapCamera) setMapCamera(camera);
    }

    const userLocationArray = [userLocation.longitude, userLocation.latitude];

    const areTripMarkersVisible = isFeatureAvailable(OtherFeatures.TRIP_MARKERS);

    return {
        hasLocationPermission,
        userLocation,
        isEditing,
        addPosition,
        setMapCamera,
        styleUrl,
        handlePress,
        handleMapRef,
        userLocationArray,
        areTripMarkersVisible,
        mapRef,
        handleTouchEnd,
        handleMapLoaded,
        handleLocationPermission
    }
}

export default useMap