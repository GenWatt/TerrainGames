import Mapbox from "@rnmapbox/maps";
import { useCreateTripStore } from '@/store/createTripStore';
import { useMapStore } from "@/store/mapStore";
import useUserLocation from "@/features/shared/hooks/useUserLocation";

function useMap() {
    const { hasLocationPermission, userLocation } = useUserLocation();

    const isEditing = useCreateTripStore((state) => state.isEditing);
    const addPosition = useCreateTripStore((state) => state.addPosition);
    const waypoints = useCreateTripStore((state) => state.waypoints);
    const selectWaypoint = useCreateTripStore((state) => state.selectWaypoint);

    const setMapCamera = useMapStore((state) => state.setMapCamera);
    const styleUrl = Mapbox.StyleURL.TrafficNight;

    const handlePress = (feature: GeoJSON.Feature) => {
        selectWaypoint(null);
        if (feature.geometry.type === 'Point' && isEditing) {
            addPosition(feature.geometry.coordinates);
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
        waypoints,
        setMapCamera,
        styleUrl,
        handlePress,
        handleMapRef,
        userLocationArray
    }
}

export default useMap