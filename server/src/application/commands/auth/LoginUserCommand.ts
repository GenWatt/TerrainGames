import { LoginUserDTO } from "../../../domain/types";
import { ICommand } from "../../types";

export class LoginUserCommand implements ICommand {
    constructor(public readonly user: LoginUserDTO) { }
}