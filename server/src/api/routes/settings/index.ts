import { Router } from "express";
import { container } from "../../../shared/DIContainer";
import SettingsController from "../../controllers/SettingsController";
import { asyncHandler } from "../../middleware/asyncHandler";
import { authMiddleware } from "../../middleware/auth";

export const SettingsRouter = Router();

const settingsController = container.resolve<SettingsController>('SettingsController');

SettingsRouter.put('/settings/metric', authMiddleware(), asyncHandler(settingsController.changeMetric.bind(settingsController)));

SettingsRouter.put('/settings/temperatureUnit', authMiddleware(), asyncHandler(settingsController.changeTemperatureUnit.bind(settingsController)));