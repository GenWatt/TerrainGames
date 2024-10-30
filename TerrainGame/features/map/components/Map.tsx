import Mapbox, { LocationPuck, MapView } from "@rnmapbox/maps";
import Marker from "./Marker";
import MapToolbar from "./MapToolbar";
import { View, Text } from 'react-native';
import useMap from "../hooks/useMap";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCreateTripStore } from "@/store/createTripStore";
import { useEffect, useRef } from "react";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_API_KEY!);

export default function Map() {
    const { hasLocationPermission, userLocationArray, styleUrl, handlePress, handleMapRef, waypoints } = useMap();
    const selectedWaypoint = useCreateTripStore((state) => state.selectedWaypoint);
    const sheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (!selectedWaypoint && sheetRef.current) {
            sheetRef.current.close();
        }
    }, [selectedWaypoint]);

    if (!hasLocationPermission) {
        return <View className="bg-background"></View>;
    }

    return (
        <>
            <MapToolbar />
            <MapView scaleBarEnabled={false} styleURL={styleUrl} style={{ flex: 1 }} onPress={handlePress}>
                <Mapbox.Camera ref={handleMapRef} zoomLevel={17} centerCoordinate={userLocationArray} pitch={45} />
                {/* My postion */}
                <LocationPuck puckBearing={'heading'} pulsing={"default"} />

                {waypoints.map((waypoint, index) => (
                    <Marker key={index} index={index} waypoint={waypoint} />
                ))}
            </MapView>

            <BottomSheet index={selectedWaypoint ? 1 : 0} snapPoints={[200, 400]} enablePanDownToClose>
                <BottomSheetView>
                    <View>
                        <Text>Selected waypoint</Text>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </>
    )
}