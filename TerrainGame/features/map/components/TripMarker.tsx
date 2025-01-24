import { Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { useCallback, useMemo, useRef, useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FeatureCollection, Point } from 'geojson';
import { ITrip } from "@/store/createTripStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { useTripStore } from "../store/TripStore";

export interface TripMarkerProps {
    trips: ITrip[];
}

export default function TripMarker({ trips }: TripMarkerProps) {
    const { selectTrip } = useTripStore();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const tripsGeoJSON: FeatureCollection<Point> = useMemo(() => {
        return {
            type: "FeatureCollection",
            features: trips.map((trip) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: trip.position.coordinates
                },
                properties: {
                    id: trip._id,
                    title: trip.title,
                    description: trip.description,
                    waypoints: trip.waypoints
                }
            }))
        };
    }, [trips]);

    const handleMarkerPress = async (event: any) => {
        const tripId: string = event.features[0].properties.id;
        const selectedTrip = trips.find(trip => trip._id === tripId);

        if (selectedTrip) {
            selectTrip(selectedTrip);
            bottomSheetRef.current?.expand();
        }
    };

    return (
        <ShapeSource id="tripMarkerSource" shape={tripsGeoJSON} onPress={handleMarkerPress}>
            <Images images={{ 'custom-marker': require('@/assets/images/marker-icon.png') }} />
            <SymbolLayer
                id="tripMarkers"
                style={{
                    iconImage: 'custom-marker',
                    iconSize: 1,
                    iconAllowOverlap: true,
                    iconPitchAlignment: 'auto',
                    iconRotationAlignment: 'auto',
                    textColor: Colors.dark.foreground,
                    textAllowOverlap: true,
                    textIgnorePlacement: true,
                    textOptional: true,
                    iconOffset: [0, -3.5],
                    iconAnchor: 'center'
                }}
            />
        </ShapeSource>
    )
};