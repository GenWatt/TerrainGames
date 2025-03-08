import path from "path";
import TripRepository from "@core/repositories/TripRepository";
import ITripRepository from "@domain/repositories/trips/ITripRepository";
import AuthService, { IAuthService } from "../services/AuthService";
import Mediator, { IMediator } from "@application/Mediator";
import IUserRepository from "@domain/repositories/users/IUserRepository";
import UserRepository from "@core/repositories/UserRepository";
import { container } from "tsyringe";
import TripController from "@api/controllers/TripController";
import AuthController from "@api/controllers/AuthController";
import SettingsController from "@api/controllers/SettingsController";
import WeatherController from "@api/controllers/WeatherController";
import logger from "@core/loggers/logger";
import { Logger } from "winston";

export default class RegisterApplication {
    constructor(
        private controllerPath: string = path.join(__dirname, '../api/controllers')
    ) {
        container.registerSingleton<ITripRepository>('ITripRepository', TripRepository);
        container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
        container.registerSingleton<IAuthService>('IAuthService', AuthService);
        container.registerSingleton<IMediator>('IMediator', Mediator);
        container.registerInstance(Logger, logger);
    }

    public registerControllers() {
        container.register<TripController>('TripController', TripController);
        container.register<AuthController>('AuthController', AuthController);
        container.register<SettingsController>('SettingsController', SettingsController);
        container.register<WeatherController>('WeatherController', WeatherController);
    }
}