import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
    public constructor(private authService: AuthService) {
        this.authService = authService;
    }

    googleCallback(req: Request, res: Response) {
        res.redirect('myapp://auth?token=${token}');
    }

    async createAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.authService.createAdmin();

            res.status(result.statusCode).send(result.message);
        }
        catch (err) {
            next(err);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.body.token;
            const result = await this.authService.register(token);

            if (result.data) {
                res.status(result.statusCode).send(result.data);
                return;
            }

            res.status(result.statusCode).send(result.message);
        }
        catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginData = req.body;
            const result = await this.authService.login(loginData);

            if (result.data) {
                res.status(result.statusCode).send(result.data);
                return;
            }

            res.status(result.statusCode).send(result.message);
        }
        catch (err) {
            next(err);
        }
    }

    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const loginData = req.body;
            const result = await this.authService.registerUser(loginData);

            if (result.data) {
                res.status(result.statusCode).send(result.data);
                return;
            }

            res.status(result.statusCode).send(result);
        }
        catch (err) {
            next(err);
        }
    }
}

export default AuthController;