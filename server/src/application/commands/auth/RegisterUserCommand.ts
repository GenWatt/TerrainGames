import { RegisterUserDTO } from "../../../../../shared/types";
import { ICommand } from "../../types";

export class RegisterCommand implements ICommand {
    constructor(public readonly user: RegisterUserDTO) { }
}