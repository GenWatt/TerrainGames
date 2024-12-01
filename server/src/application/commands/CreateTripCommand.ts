import { ITrip } from "../../domain/models/Trip";


export class CreateTripCommand {
    constructor(public trip: ITrip) {

    }
}

