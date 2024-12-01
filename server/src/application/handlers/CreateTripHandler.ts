import Trip, { ITripSchema } from "../../domain/models/Trip";
import { Waypoint } from "../../domain/models/Waypoint";
import { CreateTripCommand } from "../commands/CreateTripCommand";

export class CreateTripCommandHandler {
    async handle(command: CreateTripCommand): Promise<ITripSchema> {
        // save wayponts get its ids
        const { waypoints, title, description } = command.trip;
        console.log('waypoints', waypoints);
        const savedWaypoints = await Waypoint.insertMany(waypoints);
        const waypointIds = savedWaypoints.map(waypoint => waypoint._id);

        const trip = new Trip({
            title,
            description,
            waypoints: waypointIds
        });

        return await trip.save();
    }
}