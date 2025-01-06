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
    prefs: {
        theme: Theme;
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

export type RegisterUserDTO = {
    username: string;
    email: string;
    password: string;
}

export type LoginUserDTO = {
    username: string;
    password: string;
}