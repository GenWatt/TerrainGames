import { ResultTypes } from "../../services/AuthService";

export interface IHandler<TResult = null> {
    handle(command: ICommand): Promise<IResult<TResult>>;
}

export interface ICommand { }

export interface IResult<T> {
    data: T | null;
    isSuccess: boolean;
    error: string;
    type: ResultTypes;
    statusCode: number;
}