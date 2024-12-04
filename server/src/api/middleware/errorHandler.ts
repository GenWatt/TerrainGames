import { NextFunction, Response, Request } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err.statusCode || 500;
    const payload = status === 500
        ? { message: 'Internal server error' }
        : { message: err.message, type: err.type, data: err.data };

    console.log("Middleware Error -", err);
    res.status(status).json(payload);
}