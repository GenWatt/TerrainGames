import Mapbox, { LineLayer, LocationPuck, MapView, ShapeSource } from "@rnmapbox/maps";
import Marker from "./Marker";
import MapToolbar from "./MapToolbar";
import { View, Text } from 'react-native';
import useMap from "../hooks/useMap";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCreateTripStore } from "@/store/createTripStore";
import { useEffect, useMemo, useRef } from "react";
import Waypoint from "@/features/waypoint/componets/Waypoint";
import { FeatureCollection, LineString } from 'geojson';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_API_KEY!);

export default function Map() {
    const { hasLocationPermission, userLocationArray, styleUrl, handlePress, handleMapRef, waypoints } = useMap();
    const selectedWaypoint = useCreateTripStore((state) => state.selectedWaypoint);
    const sheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (!selectedWaypoint && sheetRef.current) {
            console.log("hey")
            sheetRef.current.close();
        }
        console.log("selectedWaypoint", selectedWaypoint);
    }, [selectedWaypoint]);

    const lineGeoJSON: FeatureCollection<LineString> = useMemo(() => {
        return {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: waypoints.map((wp) => wp.position)
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

                {waypoints.length > 1 && <ShapeSource id="lineSource" shape={lineGeoJSON}>
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

                {waypoints.map((waypoint, index) => (
                    <Marker key={index} index={index} waypoint={waypoint} />
                ))}
            </MapView>

            <BottomSheet ref={sheetRef} index={selectedWaypoint ? 1 : -1} snapPoints={[200, 400]} enablePanDownToClose>
                <BottomSheetView>
                    <Waypoint />
                </BottomSheetView>
            </BottomSheet>
        </>
    )
}