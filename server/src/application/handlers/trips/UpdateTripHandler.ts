import { ITrip } from "../../../domain/models/Trip";
import { Waypoint } from "../../../domain/models/Waypoint";

import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import ITripRepository from "../../../domain/repositories/trips/ITripRepository";
import { UpdateTripCommand } from "../../commands/trips/UpdateTripCommand";
import { ResultTypes } from "../../../domain/types/enums";

export class UpdateTripCommandHandler implements IHandler<ITrip> {
    constructor(private tripRepository: ITripRepository) { }

    async handle(command: UpdateTripCommand): Promise<Result<ITrip | null>> {
        const { tripId, trip } = command;
        const { waypoints, tripDetails } = trip;
        console.log(tripDetails);
        const editedTrip = await this.tripRepository.get(tripId);

        if (!editedTrip) {
            return Result.failure('Trip not found', ResultTypes.NOT_FOUND, 404);
        }

        // Remove waypoints that doesn't exist in the edited trip
        const waypointsToRemove = editedTrip.waypoints.filter(waypoint => !waypoints.find(wp => wp._id === waypoint.toString()));
        await Waypoint.deleteMany({ _id: { $in: waypointsToRemove } });

        // Insert new waypoints edited in the trip is populated with waypoints
        const waypointsToInsert = waypoints.filter(waypoint => !editedTrip.waypoints.find(wp => wp.toString() === waypoint._id));
        const savedWaypoints = await Waypoint.insertMany(waypointsToInsert);

        // Update waypoints that exist in the edited trip and waypoints
        const waypointsToedit = waypoints.filter(waypoint => editedTrip.waypoints.find(wp => wp.toString() === waypoint._id));

        await Promise.all(waypointsToedit.map(async waypoint => {
            await Waypoint.updateOne({ _id: waypoint._id }, waypoint);
        }));

        const waypointIds = [...savedWaypoints, ...waypointsToedit].map(waypoint => waypoint._id) as string[];

        const updatedTripData: ITrip = {
            tripDetails,
            // @ts-ignore
            waypoints: waypointIds,
            position: waypoints[0].position
        };

        const updatedTrip = await this.tripRepository.update(updatedTripData, tripId);

        return Result.success(updatedTrip, ResultTypes.UPDATED, 200);
    }
}