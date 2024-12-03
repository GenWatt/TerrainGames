import { Router } from 'express';
import TripController from '../../controllers/TripController';
import { authMiddleware } from '../../middleware/auth';
import { UserRole } from "../../../../../shared/types";

export const TripRouter = Router();

const tripController = new TripController();

TripRouter.post('/trip', authMiddleware([UserRole.ADMIN]), async (req, res, next) => {
    await tripController.create(req, res, next);
});

TripRouter.get('/trip', authMiddleware(), async (req, res, next) => {
    await tripController.getAll(req, res, next);
});

TripRouter.delete('/trip/:id', authMiddleware([UserRole.ADMIN]), async (req, res, next) => {
    await tripController.delete(req, res, next);
});