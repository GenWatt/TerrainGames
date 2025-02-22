import { ICommand } from "../../types";

export class GetTripByIdQuery implements ICommand {
    constructor(
        public readonly tripId: string,
    ) { }
}