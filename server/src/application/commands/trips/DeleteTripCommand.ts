import { ICommand } from "../../types";

export class DeleteTripCommand implements ICommand {
    constructor(public readonly tripId: string) { }
}