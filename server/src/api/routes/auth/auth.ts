import express from 'express';
import AuthController from '../../controllers/AuthController';
import { authMiddleware } from '../../middleware/auth';
import { container } from '../../../shared/DIContainer';
import { asyncHandler } from '../../middleware/asyncHandler';
// import { UserRole } from '../../types/enums';

const router = express.Router();
const authController = container.resolve<AuthController>('AuthController');

// Create admin
router.post('/auth/admin', asyncHandler(authController.createAdmin.bind(authController)));

// Login or register by token via Google auth from mobile app
// router.post('/auth/register', async (req, res, next) => {
//     console.log(req.body);
//     await authController.register(req, res, next)
// });

router.post('/auth/login', asyncHandler(authController.login.bind(authController)));

router.post('/auth/registerUser', asyncHandler(authController.registerUser.bind(authController)));

router.get('/auth/me', authMiddleware(), async (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

export default router;