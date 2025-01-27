import Mapbox, { LineLayer, LocationPuck, MapView, ShapeSource } from "@rnmapbox/maps";
import RoadMarker from "./RoadMarker";
import MapToolbar from "./MapToolbar";
import { View, Text } from 'react-native';
import useMap from "../hooks/useMap";
import { useMemo } from "react";
import { FeatureCollection, LineString } from 'geojson';
import useTrips from "@/features/trips/api/useTrips";
import TripMarker from "./TripMarker";
import TripDetails from "./TripDetails";
import { useTripStore } from "../store/TripStore";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_API_KEY!);

export default function Map() {
    const { hasLocationPermission, userLocationArray, styleUrl, handlePress, handleMapRef, waypoints } = useMap();
    const { selectedTrip, deselectTrip } = useTripStore();
    const { trips } = useTrips();

    const lineGeoJSON: FeatureCollection<LineString> = useMemo(() => {
        return {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: waypoints.map((wp) => wp.position.coordinates)
                    },
                    properties: {}
                }
            ]
        };
    }, [waypoints]);

    if (!hasLocationPermission) {
        return <View className="bg-background">
            <Text className="text-darkForeground">No location permission</Text>
        </View>;
    }

    return (
        <>
            <MapToolbar />
            <MapView scaleBarEnabled={false} styleURL={styleUrl} style={{ flex: 1 }} onPress={handlePress}>
                <Mapbox.Camera ref={handleMapRef} zoomLevel={17} centerCoordinate={userLocationArray} pitch={45} />
                {/* My postion */}
                <LocationPuck puckBearing={'heading'} pulsing={"default"} />

                {waypoints.length > 1 && <ShapeSource id="lineSource" shape={lineGeoJSON} >
                    <LineLayer
                        id="lineLayer"
                        style={{
                            lineColor: "#73ff83",
                            lineWidth: 4,
                            lineJoin: "round",
                            lineCap: "round"
                        }}
                    />
                </ShapeSource>}

                <RoadMarker waypoints={waypoints} />
                <TripMarker trips={trips} />
            </MapView>

            {selectedTrip && <TripDetails trip={selectedTrip} onClose={deselectTrip} />}
        </>
    )
}