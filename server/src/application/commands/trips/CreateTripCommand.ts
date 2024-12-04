import { ITrip } from "../../../domain/models/Trip";
import { ICommand } from "../../types";

export class CreateTripCommand implements ICommand {
    constructor(public readonly trip: ITrip) { }
}

