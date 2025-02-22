export type Position = [number, number];


export type MapboxRoadType = {
    distance: number;
    duration: number;
    geometry: {
        coordinates: Position[];
        type: string;
    };
    legs: {
        admins: {
            iso_3166_1_alpha3: string;
            iso_3166_1: string;
        }[],
        distance: number;
        duration: number;
        steps: {
            distance: number;
            duration: number;
            geometry: {
                coordinates: Position[];
                type: string;
            };
            mode: string;
            name: string;
        }[];
        summary: string;
        via_waypoints: Position[];
        weight: number;
    }[];
    weight: number;
    weight_name: string;
}

export type MapBoxDistanceApiResponse = {
    routes: MapboxRoadType[];
    waypoints: {
        distance: number;
        name: string;
        location: Position;
    }[];
    code: string;
    uuid: string;
}

export type Bounds = {
    neLat: string,
    neLng: string,
    swLat: string,
    swLng: string
}
