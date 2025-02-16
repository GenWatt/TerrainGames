import { ShapeSource, SymbolLayer, CircleLayer } from "@rnmapbox/maps";
import { useCreateTripStore, IWaypoint } from '@/features/shared/stores/createTripStore';
import { useMemo } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FeatureCollection, Point } from 'geojson';
import { useRouter } from 'expo-router';
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";

export interface MarkerProps {
    waypoints: IWaypoint[];
}

export default function DrawWaypoints({ waypoints }: MarkerProps) {
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
                }
            }))
        };
    }, [waypoints]);

    const handleMarkerPress = async (event: OnPressEvent) => {
        if (!event?.features || !event.features[0] || !event.features[0].properties) return;

        const waypointId: number = event.features[0].properties.id;
        const selectedWaypoint = waypoints[waypointId - 1];

        if (selectedWaypoint) {
            selectWaypoint(selectedWaypoint);
            router.push({ pathname: '/(modals)/waypointModal' });
        }
    };

    return (
        <ShapeSource
            id="markerSource"
            shape={markersGeoJSON}
            cluster
            clusterRadius={50}
            clusterMaxZoomLevel={14}
            hitbox={{ width: 18, height: 18 }}
            onPress={handleMarkerPress}>

            <CircleLayer
                id="clusterCircleRoad"
                filter={['has', 'point_count']}
                style={{
                    circleColor: Colors.dark.primary,
                    circleRadius: 20,
                    circleOpacity: 0.8,
                    circleStrokeWidth: 2,
                    circleStrokeColor: 'white'
                }}
            />

            <SymbolLayer
                id="clusterTextRoad"
                filter={['has', 'point_count']}
                style={{
                    textField: ['get', 'point_count_abbreviated'],
                    textSize: 14,
                    textColor: 'white',
                    textIgnorePlacement: true,
                    textAllowOverlap: true,
                    textAnchor: 'center'
                }}
            />

            <SymbolLayer
                id="individualMarkers"
                filter={['!', ['has', 'point_count']]}
                style={{
                    iconImage: 'marker-15',
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
                    iconOffset: [0, -3.5],
                    iconAnchor: 'center'
                }}
            />
        </ShapeSource>
    );
}
