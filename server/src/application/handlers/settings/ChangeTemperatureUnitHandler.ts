import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import { ChangeTemperatureUnitCommand } from "../../commands/settings/ChangeTemperatureUnitCommand";
import { ResultTypes } from "../../../domain/types/enums";
import IUserRepository from "../../../domain/repositories/users/IUserRepository";
import { UserPrefs } from "@shared/types";
import { UserType } from "../../../domain/models/User";
import { ChangeTemperatureUnitValidator } from "../../validators/settings/ChangeTemperatureUnitValidator";
import { inject, injectable } from "tsyringe";
import UserRepository from "../../../core/repositories/UserRepository";

@injectable()
export class ChangeTemperatureUnitHandler implements IHandler<UserPrefs> {
    constructor(
        @inject(UserRepository) private userRepository: IUserRepository
    ) { }

    async handle(command: ChangeTemperatureUnitCommand): Promise<Result<UserPrefs>> {
        const { unit, userId } = command;
        console.log("ChangeTemperatureUnitHandler -> handle -> command", command)
        const result = ChangeTemperatureUnitValidator.safeParse(command);

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const user = await this.userRepository.get(userId as string);
        if (!user) {
            return Result.failure("User not found", ResultTypes.NOT_FOUND, 404);
        }

        user.prefs.temperatureUnit = unit;

        const updatedUser = await this.userRepository.update(user, user._id) as UserType;
        const prefs = updatedUser.prefs as UserPrefs;

        return Result.success(prefs, ResultTypes.SUCCESS, 200);
    }
}