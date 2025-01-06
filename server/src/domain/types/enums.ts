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
}