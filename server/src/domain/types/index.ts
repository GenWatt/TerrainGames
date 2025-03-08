import { UserRole, Theme, MetricTypes, TemperatureUnits } from "./enums";

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

export type WeatherResponse = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
};


export type IUser = {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    googleId: string;
    avatar: string;
    accessToken: string;
    createdAt: Date;
    prefs: UserPrefs;
}

export type UserPrefs = {
    theme: Theme;
    metricSystem: MetricTypes;
    temperatureUnit: TemperatureUnits;
}

export type RegisterUserDTO = {
    username: string;
    email: string;
    password: string;
}

export type LoginUserDTO = {
    username: string;
    password: string;
}

