import { RegisterUserDTO } from "../../../../../shared/types";
import { ICommand } from "../../types";

export class RegisterUserCommand implements ICommand {
    constructor(public readonly user: RegisterUserDTO) { }
}