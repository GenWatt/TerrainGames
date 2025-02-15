import MapToolbar from "./MapToolbar";
import { View, Text } from 'react-native';
import useMap from "../hooks/useMap";
import { ITrip } from "@/features/shared/stores/createTripStore";
import Mapbox, { MapView, LocationPuck } from "@rnmapbox/maps";
import DrawTrip from "./DrawTrip";
import TripMarker from "./TripMarker";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_API_KEY!);

const ZOOM_LEVEL = 17;
const PITCH = 45;

export interface MapProps {
    trips: ITrip[];
    selectedTrip?: ITrip;
}

export default function Map({ trips, selectedTrip }: MapProps) {
    const {
        hasLocationPermission,
        userLocationArray,
        styleUrl,
        handlePress,
        handleMapRef,
        areTripMarkersVisible,
        handleMapLoaded,
        handleTouchEnd,
        mapRef } = useMap();

    if (!hasLocationPermission) {
        return <View className="bg-background p-2">
            <Text className="text-foreground">No location permission</Text>
        </View>;
    }

    return (
        <>
            <MapToolbar location={userLocationArray} />
            <MapView
                ref={mapRef}
                onTouchEnd={handleTouchEnd}
                onDidFinishLoadingMap={handleMapLoaded}
                compassEnabled={true}
                compassPosition={{ top: 10, left: 10 }}
                scaleBarEnabled={false}
                styleURL={styleUrl}
                style={{ flex: 1 }}
                onPress={handlePress}>
                <Mapbox.Camera
                    ref={handleMapRef}
                    zoomLevel={ZOOM_LEVEL}
                    centerCoordinate={userLocationArray}
                    pitch={PITCH}
                    animationMode="none" />

                <LocationPuck puckBearing={'heading'} pulsing={"default"} />

                {selectedTrip && <DrawTrip trip={selectedTrip} />}

                {areTripMarkersVisible && <TripMarker trips={trips} />}
            </MapView>
        </>
    )
}