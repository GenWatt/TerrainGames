import { TemperatureUnits } from "../../../domain/types/enums";
import { ICommand } from "../../types";

export class ChangeTemperatureUnitCommand implements ICommand {
    constructor(public readonly unit: TemperatureUnits, public readonly userId?: string) { }
}