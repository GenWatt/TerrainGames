import Mapbox from "@rnmapbox/maps";
import { useCreateTripStore } from '@/features/shared/stores/createTripStore';
import { useMapStore } from "@/features/map/store/MapStore";
import useUserLocation from "@/features/shared/hooks/useUserLocation";
import { AppModes, useTripStore } from "@/features/shared/stores/TripStore";
import { OtherFeatures, ToolbarActionFeatures } from "@/features/shared/types";
import useFeatureFlags from "@/features/shared/hooks/useFeatureFlags";
import { useRef } from "react";
import { GestureResponderEvent } from "react-native";
import { OrnamentPositonProp } from "@rnmapbox/maps/lib/typescript/src/utils";

function useMap() {
    const { hasLocationPermission, userLocation, handleLocationPermission } = useUserLocation();
    const { action: selectedAction, selectWaypoint, addPosition, isEditing } = useCreateTripStore((state) => state);
    const { changeMode, mode } = useTripStore();
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

    const compassPostion: OrnamentPositonProp = mode === AppModes.SELECTED_TRIP ? { bottom: 300, left: 10 } : { bottom: 50, left: 10 };

    return {
        hasLocationPermission,
        userLocation,
        isEditing,
        userLocationArray,
        areTripMarkersVisible,
        mapRef,
        styleUrl,
        compassPostion,
        addPosition,
        setMapCamera,
        handlePress,
        handleMapRef,
        handleTouchEnd,
        handleMapLoaded,
        handleLocationPermission
    }
}

export default useMap