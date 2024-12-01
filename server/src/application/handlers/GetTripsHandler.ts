import Trip, { ITrip } from "../../domain/models/Trip";
import { GetAllTripsQuery } from "../queries/GetAllTripsQuery";

export class GetAllTripsHandler {
    async handle(command: GetAllTripsQuery): Promise<ITrip[]> {
        const trips = await Trip.find().populate('waypoints');

        return trips;
    }
}