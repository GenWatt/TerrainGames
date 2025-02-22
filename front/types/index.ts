export type ILoginForm = {
    username: string;
    password: string;
}

export type IRegisterForm = {
    username: string;
    password: string;
    email: string;
}

export interface IApiResult<T = undefined> {
    type: string;
    message: string;
    statusCode: number;
    data?: T;
}

export enum MetricType {
    METRIC = 'METRIC',
    IMPERIAL = 'IMPERIAL',
}

export enum TemperatureUnit {
    CELSIUS = "°C",
    FAHRENHEIT = "°F",
    KELVIN = "K"
}

export enum Temperature {
    CELSIUS = "CELSIUS",
    FAHRENHEIT = "FAHRENHEIT",
    KELVIN = "KELVIN",
}

export type IUser = {
    _id: string;
    username: string;
    email: string;
    role: UserRole;
    googleId: string;
    avatar: string;
    accessToken: string;
    createdAt: Date;
    prefs: {
        theme: Theme;
        metricSystem: MetricType;
        temperatureUnit: Temperature;
    };
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

export type ApiError = {
    message: string;
    type: string;
    data: any;
}

export enum ResultTypes {
    ALREADY_EXISTS = 'ALREADY_EXISTS',
    CREATED = 'CREATED',
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
    TOKEN_NOT_PROVIDED = "TOKEN_NOT_PROVIDED",
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export type IQuestion = {
    _id: string;
    question: string;
    answers: string[];
    correctAnswer: string;
}

export type IQuiz = {
    latlng: number[];
    _id: string;
    title: string;
    description: string;
    questions: IQuestion[];
    createdAt: Date;
    updatedAt: Date;
}

export type WeatherData = {
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

