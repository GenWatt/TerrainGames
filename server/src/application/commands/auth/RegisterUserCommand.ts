import { RegisterUserDTO } from "../../../domain/types";
import { ICommand } from "../../types";

export class RegisterUserCommand implements ICommand {
    constructor(public readonly user: RegisterUserDTO) { }
}