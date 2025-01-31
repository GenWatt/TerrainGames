import Mapbox, { LocationPuck, MapView } from "@rnmapbox/maps";
import MapToolbar from "./MapToolbar";
import { View, Text } from 'react-native';
import useMap from "../hooks/useMap";
import TripMarker from "./TripMarker";
import MapTrip from "./MapTrip";
import { ITrip } from "@/features/shared/stores/createTripStore";
import { AppModes } from "@/features/shared/stores/TripStore";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_API_KEY!);

const ZOOM_LEVEL = 17;
const PITCH = 45;

export interface MapProps {
    trips: ITrip[];
    selectedTrip?: ITrip;
}

export default function Map({ trips, selectedTrip }: MapProps) {
    const { hasLocationPermission, userLocationArray, styleUrl, handlePress, handleMapRef, mode } = useMap();

    const isViewMode = mode === AppModes.VIEW;

    if (!hasLocationPermission) {
        return <View className="bg-background">
            <Text className="text-darkForeground">No location permission</Text>
        </View>;
    }

    return (
        <>
            <MapToolbar location={userLocationArray} />
            <MapView scaleBarEnabled={false} styleURL={styleUrl} style={{ flex: 1 }} onPress={handlePress}>
                <Mapbox.Camera ref={handleMapRef} zoomLevel={ZOOM_LEVEL} centerCoordinate={userLocationArray} pitch={PITCH} />
                {/* My postion */}
                <LocationPuck puckBearing={'heading'} pulsing={"default"} />

                {selectedTrip && <MapTrip waypoints={selectedTrip.waypoints} />}

                {isViewMode && <TripMarker trips={trips} />}
            </MapView>
        </>
    )
}