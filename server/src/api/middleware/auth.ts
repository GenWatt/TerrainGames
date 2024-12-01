import { User } from '../../domain/models/User';
import { Request, Response, NextFunction } from 'express';
import { Result, ResultTypes } from '../../services/AuthService';
import jwt from 'jsonwebtoken';
import { UserRole } from "../../../../shared/types";

export const authMiddleware = (roles: UserRole[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token + ' token');
        if (!token) {
            return next(new Result(ResultTypes.NOT_AUTHORIZED, 'User not authorized (Token not found)', 401));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            if (typeof decoded === 'string') {
                return next(new Result(ResultTypes.NOT_AUTHORIZED, 'User not authorized', 401));
            }

            if (!decoded) {
                return next(new Result(ResultTypes.NOT_AUTHORIZED, 'User not authorized', 401));
            }

            const user = await User.findOne({ email: decoded.email });

            if (!user || user.accessToken !== token) {
                return next(new Result(ResultTypes.NOT_AUTHORIZED, 'User not authorized', 401));
            }

            if (roles.length && !roles.includes(user.role)) {
                return next(new Result(ResultTypes.FORBIDDEN, 'User does not have the required role', 403));
            }

            req.user = user;
            next();
        } catch (err: any) {
            if (err.name === 'TokenExpiredError') {
                return next(new Result(ResultTypes.NOT_AUTHORIZED, 'Token expired', 401));
            }

            next(err);
        }
    };
};
