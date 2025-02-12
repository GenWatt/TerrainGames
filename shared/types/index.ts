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

export type RegisterUserDTO = {
    username: string;
    email: string;
    password: string;
}

export type LoginUserDTO = {
    username: string;
    password: string;
}

export enum TemperatureUnits {
    CELSIUS = '°C',
    FAHRENHEIT = '°F',
}

export enum Temperature {
    CELSIUS = 'CELSIUS',
    FAHRENHEIT = 'FAHRENHEIT',
}