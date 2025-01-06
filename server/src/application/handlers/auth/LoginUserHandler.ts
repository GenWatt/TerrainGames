import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import AuthService from "../../../services/AuthService";
import IUserRepository from "../../../domain/repositories/users/IUserRepository";
import { LoginUserCommand } from "../../commands/auth/LoginUserCommand";
import { LoginUserValidator } from "../../validators/LoginUserValidator";
import { ResultTypes } from "../../../domain/types/enums";
import { UserDTO } from "../../DTO/UserDTO";

export class LoginUserHandler implements IHandler<UserDTO> {
    constructor(private userRepository: IUserRepository, private authService: AuthService) { }

    async handle(command: LoginUserCommand): Promise<Result<UserDTO>> {
        const { user } = command;

        const result = LoginUserValidator.safeParse(user);

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const savedUser = await this.userRepository.findByUsername(user.username);
        if (!savedUser) {
            return Result.failure("Invalid email or password", ResultTypes.INVALID_CREDENTIALS, 401);
        }

        const isPasswordValid = await this.authService.verifyPassword(user.password, savedUser.password);
        if (!isPasswordValid) {
            return Result.failure("Invalid email or password", ResultTypes.INVALID_CREDENTIALS, 401);
        }

        const token = this.authService.generateToken(savedUser);

        savedUser.accessToken = token;
        await this.userRepository.update(savedUser, savedUser._id);

        return Result.success({ ...new UserDTO(savedUser) }, ResultTypes.SUCCESS, 200);
    }
}