import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import AuthService, { IAuthService } from "../../../services/AuthService";
import IUserRepository from "../../../domain/repositories/users/IUserRepository";
import { LoginUserCommand } from "../../commands/auth/LoginUserCommand";
import { LoginUserValidator } from "../../validators/auth/LoginUserValidator";
import { ResultTypes } from "../../../domain/types/enums";
import { UserDTO } from "../../DTO/UserDTO";
import { inject, injectable } from "tsyringe";
import UserRepository from "../../../core/repositories/UserRepository";
import { Logger } from "winston";

@injectable()
export class LoginUserHandler implements IHandler<UserDTO> {
    constructor(
        @inject(UserRepository) private userRepository: IUserRepository,
        @inject(AuthService) private authService: IAuthService,
        @inject(Logger) private logger: Logger
    ) { }

    async handle(command: LoginUserCommand): Promise<Result<UserDTO>> {
        const { user } = command;
        this.logger.info(`Logging in user: ${user.username}`);

        const result = LoginUserValidator.safeParse(user);

        if (!result.success) {
            this.logger.error(`Validation failed: ${result.error.errors.map(e => e.message).join(", ")}`);
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const savedUser = await this.userRepository.findByUsername(user.username);
        if (!savedUser) {
            this.logger.error(`User not found: ${user.username}`);
            return Result.failure("Invalid email or password", ResultTypes.INVALID_CREDENTIALS, 401);
        }

        const isPasswordValid = await this.authService.verifyPassword(user.password, savedUser.password);
        if (!isPasswordValid) {
            this.logger.error(`Invalid password: ${user.username}`);
            return Result.failure("Invalid email or password", ResultTypes.INVALID_CREDENTIALS, 401);
        }

        const token = this.authService.generateToken(savedUser);

        savedUser.accessToken = token;
        await this.userRepository.update(savedUser, savedUser._id);

        this.logger.info(`User logged in: ${user.username}`);
        return Result.success({ ...new UserDTO(savedUser) }, ResultTypes.SUCCESS, 200);
    }
}