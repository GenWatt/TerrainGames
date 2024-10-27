import Mapbox, { MapView } from "@rnmapbox/maps";
import { usePathStore } from '@/store/createPathStore';
import Marker from "./Marker";
import MapActions from "./MapActions";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_API_KEY!);

export default function Map() {
    const isEditing = usePathStore((state) => state.isEditing);
    const addPosition = usePathStore((state) => state.addPosition);
    const positions = usePathStore((state) => state.positions);

    const styleUrl = Mapbox.StyleURL.SatelliteStreet;

    const handlePress = (feature: GeoJSON.Feature) => {
        if (feature.geometry.type === 'Point' && isEditing) {
            addPosition(feature.geometry.coordinates);
        }
    }

    return (
        <>
            <MapActions />
            <MapView styleURL={styleUrl} style={{ flex: 1 }} onPress={handlePress}>
                <Mapbox.Camera zoomLevel={17} centerCoordinate={[10.7522, 59.9139]} />

                {positions.map((position, index) => (
                    <Marker key={index} index={index} position={position} />
                ))}
            </MapView>
        </>
    )
}