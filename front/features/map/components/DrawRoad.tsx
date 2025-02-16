import { MapboxRoadType } from "@/features/shared/stores/createTripStore";
import { ShapeSource, LineLayer } from "@rnmapbox/maps";
import { useMemo } from "react";
import { FeatureCollection, LineString } from 'geojson';

export interface MapTripProps extends Partial<LineLayer['props']> {
    road: MapboxRoadType;
}

const createFeatureCollection = (geometry: LineString): FeatureCollection<LineString> => {
    return {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry,
                properties: {}
            }
        ]
    }
};

const roadStyle = {
    lineColor: "#73ff83",
    lineWidth: 4,
    lineJoin: "round",
    lineCap: "round"
}

function DrawRoad({ road, ...rest }: MapTripProps) {
    const hasRoadGeometry = road && road.geometry && road.geometry.coordinates.length > 1;

    const tripRoadGeoJSON: FeatureCollection<LineString> = useMemo(() => {
        return createFeatureCollection(road ? road.geometry : { type: "LineString", coordinates: [] });
    }, [road]);

    return (
        <>
            {hasRoadGeometry && <ShapeSource id="lineSource" shape={tripRoadGeoJSON} >
                <LineLayer
                    id="lineLayer"
                    style={roadStyle}
                    {...rest}
                />
            </ShapeSource>}
        </>
    )
}

export default DrawRoad