import { NextFunction, Request, Response } from "express";

export const asyncHandler = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req, res, next);
    }
    catch (err) {
        console.log(err + " - asyncHandler");
        next(err);
    }
}