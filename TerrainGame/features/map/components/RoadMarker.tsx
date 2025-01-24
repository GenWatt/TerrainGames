import { ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { useCreateTripStore, IWaypoint } from '@/store/createTripStore';
import { useMemo } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FeatureCollection, Point } from 'geojson';
import { useRouter } from 'expo-router';

export interface MarkerProps {
    waypoints: IWaypoint[];
}

export default function RoadMarker({ waypoints }: MarkerProps) {
    const selectWaypoint = useCreateTripStore((state) => state.selectWaypoint);
    const router = useRouter();

    const markersGeoJSON: FeatureCollection<Point> = useMemo(() => {
        return {
            type: "FeatureCollection",
            features: waypoints.map((wp, index) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: wp.position.coordinates
                },
                properties: {
                    id: index + 1,
                    title: wp.title
                }
            }))
        };
    }, [waypoints]);

    const handleMarkerPress = async (event: any) => {
        // const { screenPointX, screenPointY } = event.properties;
        const index: number = event.features[0].properties.id;
        console.log('handleMarkerPress', index);
        selectWaypoint(waypoints[index - 1]);
        router.push({ pathname: '/(modals)/waypointModal' });
    };

    return (
        <ShapeSource id="markerSource" shape={markersGeoJSON} cluster={true}
            clusterRadius={50}
            clusterMaxZoomLevel={14}
            onPress={handleMarkerPress}>
            <SymbolLayer
                id="clusteredMarkers"
                filter={['has', 'point_count']}
                style={{
                    iconImage: 'circle',
                    iconSize: 1.5,
                    iconColor: Colors.dark.primary,
                    textField: '{point_count}',
                    textSize: 12,
                    textColor: Colors.dark.foreground,
                    textOffset: [0, 0.5],
                    textAnchor: 'top',
                    iconPitchAlignment: 'map',
                    iconRotationAlignment: 'map',
                }}
            />
            <SymbolLayer
                id="individualMarkers"
                filter={['!', ['has', 'point_count']]}
                style={{
                    iconImage: 'marker-15', // Use a built-in symbol or custom marker
                    iconSize: 5,
                    iconAllowOverlap: true,
                    textField: ['get', 'id'],
                    textSize: 12,
                    textOffset: [0, -.5],
                    textAnchor: 'top',
                    iconPitchAlignment: 'auto',
                    iconRotationAlignment: 'auto',
                    textColor: Colors.dark.foreground,
                    textAllowOverlap: true,
                    textIgnorePlacement: true,
                    textOptional: true,
                    iconOffset: [0, -3.5], // Adjust the icon offset as needed
                    iconAnchor: 'center' // Adjust the icon anchor as needed
                }}
            />
        </ShapeSource>
    )
}