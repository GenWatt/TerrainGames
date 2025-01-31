import Mapbox from "@rnmapbox/maps";
import { ToolbarActionTypes, useCreateTripStore } from '@/features/shared/stores/createTripStore';
import { useMapStore } from "@/features/map/store/MapStore";
import useUserLocation from "@/features/shared/hooks/useUserLocation";
import { AppModes, useTripStore } from "@/features/shared/stores/TripStore";

function useMap() {
    const { hasLocationPermission, userLocation } = useUserLocation();
    const { action: selectedAction, selectWaypoint, addPosition, isEditing } = useCreateTripStore((state) => state);
    const { changeMode, mode } = useTripStore();

    const setMapCamera = useMapStore((state) => state.setMapCamera);
    const styleUrl = Mapbox.StyleURL.TrafficNight;

    const handlePress = (feature: GeoJSON.Feature) => {
        selectWaypoint(null);
        if (selectedAction === ToolbarActionTypes.ADD_POSITION && feature.geometry.type === 'Point') {
            addPosition(feature.geometry.coordinates);
            changeMode(AppModes.CREATE_TRIP);
        }
    }

    const handleMapRef = (camera: Mapbox.Camera | null) => {
        if (camera) setMapCamera(camera);
    }

    const userLocationArray = userLocation ? [userLocation.longitude, userLocation.latitude] : [18.9480, 49.7921];

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
        mode
    }
}

export default useMap