export type ILoginForm = {
    username: string;
    password: string;
}

export type IRegisterForm = {
    username: string;
    password: string;
    email: string;
}

export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export type IUser = {
    __v: number;
    _id: string;
    email: string;
    role: UserRoles;
    username: string;
    accessToken: string;
    createdAt: Date;
    prefs: {
        theme: string;
    }
}

export interface IApiResult<T = undefined> {
    type: string;
    message: string;
    statusCode: number;
    data?: T;
}