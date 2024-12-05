import Trip, { ITrip } from "../../../domain/models/Trip";
import { Waypoint } from "../../../domain/models/Waypoint";
import { CreateTripCommand } from "../../commands/trips/CreateTripCommand";
import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import { ResultTypes } from "../../../services/AuthService";
import ITripRepository from "../../../domain/repositories/trips/ITripRepository";

export class CreateTripCommandHandler implements IHandler<ITrip> {
    constructor(private tripRepository: ITripRepository) { }

    async handle(command: CreateTripCommand) {
        const { waypoints, title, description, city, country } = command.trip;

        const waypointsWithPoint = waypoints.map(waypoint => ({ ...waypoint, position: { type: 'Point', coordinates: waypoint.position } }))

        const savedWaypoints = await Waypoint.insertMany(waypointsWithPoint);
        const waypointIds = savedWaypoints.map(waypoint => waypoint._id);

        const trip = new Trip({
            title,
            description,
            waypoints: waypointIds,
            city,
            country
        });

        const savedTrip = await this.tripRepository.create(trip);

        return Result.success(savedTrip, ResultTypes.CREATED, 201);
    }
}