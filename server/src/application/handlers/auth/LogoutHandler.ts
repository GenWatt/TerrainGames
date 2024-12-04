import { Result } from "../../../domain/Result";
import { ResultTypes } from "../../../services/AuthService";
import { LogoutCommand } from "../../commands/auth/LogoutCommand";
import type { IHandler } from "../../types";

export class LogoutHandler implements IHandler {
    async handle(command: LogoutCommand) {

        return Result.success(null, ResultTypes.SUCCESS, 200);
    }
}