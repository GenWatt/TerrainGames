export interface IProduct {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}

export enum ResultTypes {
    ALREADY_EXISTS = 'ALREADY_EXISTS',
    GET = 'GET',
    CREATED = 'CREATED',
    DELETED = 'DELETED',
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
    TOKEN_NOT_PROVIDED = "TOKEN_NOT_PROVIDED",
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    FORBIDDEN = 'FORBIDDEN',
    SUCCESS = 'SUCCESS',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    UPDATED = 'UPDATED',
    CONFLICT = 'CONFLICT',
    BAD_REQUEST = 'BAD_REQUEST',
    ROAD_ERROR = 'ROAD_ERROR',
    WEATHER_ERROR = 'WEATHER_ERROR',
}

export enum MetricTypes {
    METRIC = 'metric',
    IMPERIAL = 'imperial',
}

export enum UserRole {
    ADMIN = 'ADMIN',
    CREATOR = 'CREATOR',
    USER = 'USER',
}

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum TemperatureUnits {
    CELSIUS = '°C',
    FAHRENHEIT = '°F',
}

export enum Temperature {
    CELSIUS = 'CELSIUS',
    FAHRENHEIT = 'FAHRENHEIT',
}
