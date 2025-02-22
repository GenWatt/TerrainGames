import { ICommand } from "../../types";

export class GetWeatherQuery implements ICommand {
    constructor(public readonly latitude: number, public readonly longitude: number) { }
}