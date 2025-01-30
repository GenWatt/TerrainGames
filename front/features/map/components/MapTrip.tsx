import { IWaypoint } from "@/features/shared/stores/createTripStore";
import { ShapeSource, LineLayer } from "@rnmapbox/maps";
import RoadMarker from "./RoadMarker";
import { useMemo } from "react";
import { FeatureCollection, LineString } from 'geojson';

export interface MapTripProps {
    waypoints: IWaypoint[];
}

function MapTrip({ waypoints }: MapTripProps) {
    const tripRoadGeoJSON: FeatureCollection<LineString> = useMemo(() => {
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

    return (
        <>
            {waypoints.length > 1 && <ShapeSource id="lineSource" shape={tripRoadGeoJSON} >
                <LineLayer
                    id="lineLayer"
                    style={{
                        lineColor: "#73ff83",
                        lineWidth: 4,
                        lineJoin: "round",
                        lineCap: "round"
                    }}
                />
            </ShapeSource>
            }
            <RoadMarker waypoints={waypoints} />
        </>
    )
}

export default MapTrip