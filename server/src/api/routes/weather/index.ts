import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { asyncHandler } from '../../middleware/asyncHandler';
import WeatherController from '../../controllers/WeatherController';
import { container } from 'tsyringe';

export const WeatherRouter = Router();

const weatherController = container.resolve<WeatherController>(WeatherController);

WeatherRouter.get(
    '/weather/:latLong',
    authMiddleware([]),
    asyncHandler(weatherController.get.bind(weatherController))
);