import { RegisterCommand } from "../../commands/auth/RegisterUserCommand";
import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import { User } from "../../../domain/models/User";
import IUserRepository from "../../../domain/repositories/users/IUserRepository";
import { RegisterUserValidator } from "../../validators/auth/RegisterUserValidator";
import { UserDTO } from "../../DTO/UserDTO";
import { ResultTypes } from "../../../domain/types/enums";
import { inject, injectable } from "tsyringe";
import UserRepository from "../../../core/repositories/UserRepository";

@injectable()
export class RegisterUserHandler implements IHandler<UserDTO> {
    constructor(
        @inject(UserRepository) private userRepository: IUserRepository
    ) { }

    async handle(command: RegisterCommand): Promise<Result<UserDTO>> {
        const { user } = command;

        const result = RegisterUserValidator.safeParse(user);

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const existingUser = await this.userRepository.findByEmail(user.email);
        if (existingUser) {
            return Result.failure("User already exists", ResultTypes.CONFLICT, 409);
        }

        const newUser = new User(user);
        const savedUser = await this.userRepository.create(newUser);
        console.log(savedUser);
        return Result.success(new UserDTO(savedUser), ResultTypes.CREATED, 201);
    }
}