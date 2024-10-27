import express from 'express';
import AuthController from '../../controllers/authController';
import AuthService from '../../services/AuthService';
import { authMiddleware } from '../../middleware/auth';
// import { UserRole } from '../../types/enums';

const router = express.Router();
const authController = new AuthController(new AuthService());

// Create admin
router.post('/auth/admin', async (req, res, next) => { await authController.createAdmin(req, res, next) });

// Login or register by token via Google auth from mobile app
router.post('/auth/register', async (req, res, next) => {
    console.log(req.body);
    await authController.register(req, res, next)
});

router.post('/auth/login', async (req, res, next) => {
    await authController.login(req, res, next)
});

router.post('/auth/registerUser', async (req, res, next) => {
    await authController.registerUser(req, res, next)
});

router.get('/auth/me', authMiddleware, async (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

export default router;