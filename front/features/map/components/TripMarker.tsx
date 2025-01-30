import { Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { useMemo, useRef } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FeatureCollection, Point } from 'geojson';
import { ITrip } from "@/features/shared/stores/createTripStore";
import BottomSheet from "@gorhom/bottom-sheet";
import { useTripStore } from "../../shared/stores/TripStore";

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
                    coordinates: trip.tripDetails.position.coordinates
                },
                properties: {
                    id: trip._id,
                    title: trip.tripDetails.title,
                    description: trip.tripDetails.description,
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