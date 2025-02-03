import Mapbox from "@rnmapbox/maps";
import { useCreateTripStore } from '@/features/shared/stores/createTripStore';
import { useMapStore } from "@/features/map/store/MapStore";
import useUserLocation from "@/features/shared/hooks/useUserLocation";
import { AppModes, useTripStore } from "@/features/shared/stores/TripStore";
import { OtherFeatures, ToolbarActionFeatures } from "@/features/shared/types";
import useFeatureFlags from "@/features/shared/hooks/useFeatureFlags";

function useMap() {
    const { hasLocationPermission, userLocation } = useUserLocation();
    const { action: selectedAction, selectWaypoint, addPosition, isEditing } = useCreateTripStore((state) => state);
    const { changeMode } = useTripStore();
    const { isFeatureAvailable } = useFeatureFlags();

    const setMapCamera = useMapStore((state) => state.setMapCamera);
    const styleUrl = Mapbox.StyleURL.TrafficNight;

    const handlePress = (feature: GeoJSON.Feature) => {
        selectWaypoint(null);
        if (selectedAction === ToolbarActionFeatures.ADD_WAYPOINT && feature.geometry.type === 'Point') {
            addPosition(feature.geometry.coordinates);
            changeMode(AppModes.CREATE_TRIP);
        }
    }

    const handleMapRef = (camera: Mapbox.Camera | null) => {
        if (camera) setMapCamera(camera);
    }

    const userLocationArray = userLocation ? [userLocation.longitude, userLocation.latitude] : [18.9480, 49.7921];

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
        areTripMarkersVisible
    }
}

export default useMap