import path from "path";
import TripRepository from "../core/repositories/TripRepository";
import ITripRepository from "../domain/repositories/trips/ITripRepository";
import AuthService from "../services/AuthService";
import { container } from "../shared/DIContainer";
import Mediator from "./Mediator";
import IUserRepository from "../domain/repositories/users/IUserRepository";
import UserRepository from "../core/repositories/UserRepository";

export default class RegisterApplication {
    constructor(
        private controllerPath: string = path.join(__dirname, '../api/controllers')
    ) {
        container.register(AuthService.name, new AuthService());
        container.register<ITripRepository>(TripRepository.name, new TripRepository());
        container.register<IUserRepository>(UserRepository.name, new UserRepository());

        container.register(Mediator.name, new Mediator());
        container.registerControllers(controllerPath);
    }
}