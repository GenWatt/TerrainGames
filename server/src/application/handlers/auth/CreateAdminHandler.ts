import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import IUserRepository from "../../../domain/repositories/users/IUserRepository";
import { CreateAdminCommand } from "../../commands/auth/CreateAdminCommand";
import { CreateAdminValidator } from "../../validators/auth/CreateAdminValidator";
import { User } from "../../../domain/models/User";
import { UserDTO } from "../../DTO/UserDTO";
import { ResultTypes, UserRole } from "../../../domain/types/enums";
import { inject, injectable } from "tsyringe";
import UserRepository from "../../../core/repositories/UserRepository";

@injectable()
export class CreateAdminHandler implements IHandler<UserDTO> {
    constructor(
        @inject(UserRepository) private userRepository: IUserRepository,
    ) { }

    async handle(command: CreateAdminCommand): Promise<Result<UserDTO>> {
        const { user } = command;

        const result = CreateAdminValidator.safeParse(user);

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const existingUser = await this.userRepository.findByUsername(user.username);
        if (existingUser) {
            return Result.failure("Username already exists", ResultTypes.CONFLICT, 409);
        }

        const newUser = new User({ ...user, role: UserRole.ADMIN });
        const savedUser = await this.userRepository.create(newUser);

        return Result.success(new UserDTO(savedUser), ResultTypes.SUCCESS, 201);
    }
}