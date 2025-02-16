import { Router } from 'express';
import TripController from '../../controllers/TripController';
import { authMiddleware } from '../../middleware/auth';
import { UserRole } from "../../../../../shared/types";
import { container } from '../../../shared/DIContainer';
import { asyncHandler } from '../../middleware/asyncHandler';

export const TripRouter = Router();

const tripController = container.resolve<TripController>('TripController');

TripRouter.post('/trip', authMiddleware([UserRole.ADMIN]), asyncHandler(tripController.create.bind(tripController)));

TripRouter.get('/trip', authMiddleware(), asyncHandler(tripController.getAll.bind(tripController)));

TripRouter.delete('/trip/:id', authMiddleware([UserRole.ADMIN]), asyncHandler(tripController.delete.bind(tripController)));

TripRouter.put('/trip/:id', authMiddleware([UserRole.ADMIN]), asyncHandler(tripController.update.bind(tripController)));

TripRouter.post('/trip/draw-road', authMiddleware([UserRole.ADMIN]), asyncHandler(tripController.drawRoad.bind(tripController)));

TripRouter.get('/trip/:id', authMiddleware(), asyncHandler(tripController.getById.bind(tripController)));