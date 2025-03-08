import express from 'express';
import AuthController from '@api/controllers/AuthController';
import { authMiddleware } from '@api/middleware/auth';
import { asyncHandler } from '@api/middleware/asyncHandler';
import { container } from 'tsyringe';
// import { UserRole } from '../../types/enums';

export const AuthRouter = express.Router();
const authController = container.resolve<AuthController>(AuthController);

// Create admin
AuthRouter.post('/auth/admin', asyncHandler(authController.createAdmin.bind(authController)));

// Login or register by token via Google auth from mobile app
// AuthRouter.post('/auth/register', async (req, res, next) => {
//     console.log(req.body);
//     await authController.register(req, res, next)
// });

AuthRouter.post('/auth/login', asyncHandler(authController.login.bind(authController)));

AuthRouter.post('/auth/registerUser', asyncHandler(authController.registerUser.bind(authController)));

AuthRouter.get('/auth/me', authMiddleware(), async (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

export default AuthRouter;