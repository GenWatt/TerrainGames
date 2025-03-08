import { NextFunction, Request, Response } from 'express';
import { RegisterUserCommand } from '@application/commands/auth/RegisterUserCommand';
import Mediator, { IMediator } from '@application/Mediator';
import { LoginUserCommand } from '@application/commands/auth/LoginUserCommand';
import { CreateAdminCommand } from '@application/commands/auth/CreateAdminCommand';
import { inject, injectable } from 'tsyringe';

@injectable()
class AuthController {
    public constructor(
        @inject(Mediator) private mediator: IMediator
    ) { }

    googleCallback(req: Request, res: Response) {
        res.redirect('myapp://auth?token=${token}');
    }

    async createAdmin(req: Request, res: Response, next: NextFunction) {
        const result = await this.mediator.send(new CreateAdminCommand({
            username: 'Adminek',
            email: process.env.ADMIN_EMAIL!,
            password: process.env.ADMIN_PASSWORD!
        }));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const result = await this.mediator.send(new LoginUserCommand(req.body));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }

    async registerUser(req: Request, res: Response, next: NextFunction) {
        const result = await this.mediator.send(new RegisterUserCommand(req.body));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }
}

export default AuthController;
