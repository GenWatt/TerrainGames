import { User } from '../../domain/models/User';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from "@shared/types";
import { Result } from '../../domain/Result';
import { ResultTypes } from '../../domain/types/enums';

export const authMiddleware = (roles: UserRole[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(req.headers.authorization + ' token');
        if (!token || token === 'undefined') {
            console.log('User not authorized (Token not found)');
            return next(Result.failure('User not authorized (Token not found)', ResultTypes.NOT_AUTHORIZED, 401));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            console.log(decoded + ' decoded');
            if (typeof decoded === 'string' || !decoded) {
                return next(Result.failure('User not authorized', ResultTypes.NOT_AUTHORIZED, 401));
            }

            const user = await User.findOne({ email: decoded.email });

            if (!user || user.accessToken !== token) {
                return next(Result.failure('User not authorized', ResultTypes.NOT_AUTHORIZED, 401));
            }

            if (roles.length && !roles.includes(user.role)) {
                return next(Result.failure('User does not have the required role', ResultTypes.FORBIDDEN, 403));
            }

            req.user = user;
            next();
        } catch (err: any) {
            if (err.name === 'TokenExpiredError') {
                return next(Result.failure('Token expired', ResultTypes.NOT_AUTHORIZED, 401));
            }

            next(err);
        }
    };
};
