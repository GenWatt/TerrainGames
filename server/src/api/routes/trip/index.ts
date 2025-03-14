import { Router } from 'express';
import TripController from '@api/controllers/TripController';
import { authMiddleware } from '@api/middleware/auth';
import { asyncHandler } from '@api/middleware/asyncHandler';
import { container } from 'tsyringe';
import { UserRole } from '@domain/types/enums';

export const TripRouter = Router();

const tripController = container.resolve(TripController);

TripRouter.post('/trip', authMiddleware([UserRole.ADMIN]), asyncHandler(tripController.create.bind(tripController)));

TripRouter.get('/trip', authMiddleware(), asyncHandler(tripController.getAll.bind(tripController)));

TripRouter.delete('/trip/:id', authMiddleware([UserRole.ADMIN]), asyncHandler(tripController.delete.bind(tripController)));

TripRouter.put('/trip/:id', authMiddleware([UserRole.ADMIN]), asyncHandler(tripController.update.bind(tripController)));

TripRouter.post('/trip/draw-road', authMiddleware(), asyncHandler(tripController.drawRoad.bind(tripController)));

TripRouter.get('/trip/:id', authMiddleware(), asyncHandler(tripController.getById.bind(tripController)));