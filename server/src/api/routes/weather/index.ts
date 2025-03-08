import { Router } from 'express';
import { authMiddleware } from '@api/middleware/auth';
import { asyncHandler } from '@api/middleware/asyncHandler';
import WeatherController from '@api/controllers/WeatherController';
import { container } from 'tsyringe';

export const WeatherRouter = Router();

const weatherController = container.resolve<WeatherController>(WeatherController);

WeatherRouter.get(
    '/weather/:latLong',
    authMiddleware([]),
    asyncHandler(weatherController.get.bind(weatherController))
);