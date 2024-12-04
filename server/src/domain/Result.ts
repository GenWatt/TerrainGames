import { IResult } from "../application/types";
import { ResultTypes } from "../services/AuthService";

export class Result<T> implements IResult<T> {
    data: T | null;
    isSuccess: boolean;
    error: string;
    type: ResultTypes;
    statusCode: number;

    private constructor(data: T | null, isSuccess: boolean, error: string, type: ResultTypes, statusCode: number) {
        this.data = data;
        this.isSuccess = isSuccess;
        this.error = error;
        this.type = type;
        this.statusCode = statusCode;
    }

    static success<T>(data: T, type: ResultTypes, statusCode: number): Result<T> {
        return new Result<T>(data, true, '', type, statusCode);
    }

    static failure<T>(error: string, type: ResultTypes, statusCode: number): Result<T> {
        return new Result<T>(null, false, error, type, statusCode);
    }
}