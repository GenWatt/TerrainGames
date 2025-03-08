import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import { ChangeMetricCommand } from "../../commands/settings/ChangeMetricCommand";
import { ResultTypes } from "../../../domain/types/enums";
import IUserRepository from "../../../domain/repositories/users/IUserRepository";
import { UserType } from "../../../domain/models/User";
import { ChangeMetricValidator } from "../../validators/settings/ChangeMetricValidator";
import { inject, injectable } from "tsyringe";
import UserRepository from "../../../core/repositories/UserRepository";
import { UserPrefs } from "../../../domain/types";

@injectable()
export class ChangeMetricHandler implements IHandler<UserPrefs> {
    constructor(
        @inject(UserRepository) private userRepository: IUserRepository
    ) { }

    async handle(command: ChangeMetricCommand): Promise<Result<UserPrefs>> {
        const { metric, userId } = command;
        const result = ChangeMetricValidator.safeParse(command);

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const user = await this.userRepository.get(userId as string);
        if (!user) {
            return Result.failure("User not found", ResultTypes.NOT_FOUND, 404);
        }

        user.prefs.metricSystem = metric;

        const updatedUser = await this.userRepository.update(user, user._id) as UserType;
        const prefs = updatedUser.prefs as UserPrefs;

        return Result.success(prefs, ResultTypes.SUCCESS, 200);
    }
}