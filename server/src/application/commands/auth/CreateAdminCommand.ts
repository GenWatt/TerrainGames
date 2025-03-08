import { RegisterUserDTO } from "../../../domain/types";
import { ICommand } from "../../types";

export class CreateAdminCommand implements ICommand {
    constructor(public readonly user: RegisterUserDTO) { }
}