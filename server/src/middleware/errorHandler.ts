import { NextFunction, Response, Request } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message || 'Something broke!';

    console.log(err);
    res.status(status).send(message);
}