import MapToolbar from "./MapToolbar";
import useMap from "../viewModels/useMap.hook";
import { ITrip, MapboxRoadType } from "@/features/shared/stores/createTripStore";
import Mapbox, { MapView, LocationPuck } from "@rnmapbox/maps";
import TripMarker from "./TripMarker";
import DrawWaypoints from "./DrawWaypoints";
import DrawRoad from "./DrawRoad";
import NoLocationPermission from "./NoLocationPermission";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_API_KEY!);

const ZOOM_LEVEL = 17;
const PITCH = 45;

export interface MapProps {
    trips: ITrip[];
    selectedTrip?: ITrip;
    road?: MapboxRoadType;
}

export default function Map({ trips, selectedTrip, road }: MapProps) {
    const {
        userLocationArray,
        styleUrl,
        areTripMarkersVisible,
        mapRef,
        compassPostion,
        handlePress,
        handleMapRef,
        handleMapLoaded,
        handleTouchEnd
    } = useMap();

    return (
        <>
            <NoLocationPermission />
            <MapToolbar location={userLocationArray} />
            <MapView
                ref={mapRef}
                compassPosition={compassPostion}
                compassEnabled={true}
                scaleBarEnabled={false}
                styleURL={styleUrl}
                style={{ flex: 1 }}
                onTouchEnd={handleTouchEnd}
                onDidFinishLoadingMap={handleMapLoaded}
                onPress={handlePress}>
                <Mapbox.Camera
                    ref={handleMapRef}
                    zoomLevel={ZOOM_LEVEL}
                    centerCoordinate={userLocationArray}
                    pitch={PITCH}
                    animationMode="none" />

                <LocationPuck puckBearing={'heading'} pulsing={"default"} />

                {selectedTrip && <DrawWaypoints waypoints={selectedTrip.waypoints} />}
                {road && <DrawRoad road={road} />}

                {areTripMarkersVisible && <TripMarker trips={trips} />}
            </MapView>
        </>
    )
}