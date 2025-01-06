import { RegisterUserDTO } from "@shared/types";
import { ICommand } from "../../types";

export class CreateAdminCommand implements ICommand {
    constructor(public readonly user: RegisterUserDTO) { }
}