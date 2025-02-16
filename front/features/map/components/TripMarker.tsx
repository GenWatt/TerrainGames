import { CircleLayer, Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { useMemo } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FeatureCollection, Point } from 'geojson';
import { ITrip } from "@/features/shared/stores/createTripStore";
import { useTripStore } from "../../shared/stores/TripStore";

export interface TripMarkerProps {
    trips: ITrip[];
}

export default function TripMarker({ trips }: TripMarkerProps) {
    const { selectTrip } = useTripStore();

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
        }
    };

    return (
        <ShapeSource
            id="tripMarkerSource"
            shape={tripsGeoJSON}
            onPress={handleMarkerPress}
            cluster
            clusterRadius={50}
            clusterMaxZoomLevel={40}
            hitbox={{ width: 18, height: 18 }}
        >
            <Images images={{ 'custom-marker': require('@/assets/images/marker-icon.png') }} />

            <SymbolLayer
                id="tripMarkers"
                filter={['!', ['has', 'point_count']]}
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

            <CircleLayer
                id="clusterCircle"
                filter={['has', 'point_count']}
                style={{
                    circleColor: '#FF5733',
                    circleRadius: 18,
                    circleOpacity: 0.8
                }}
            />

            <SymbolLayer
                id="clusterText"
                filter={['has', 'point_count']}
                style={{
                    textField: ['get', 'point_count_abbreviated'],
                    textSize: 14,
                    textColor: 'white',
                    textIgnorePlacement: true,
                    textAllowOverlap: true
                }}
            />

        </ShapeSource>
    )
};