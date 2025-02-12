import Trip, { ITrip } from "../../../domain/models/Trip";
import { Waypoint } from "../../../domain/models/Waypoint";
import { CreateTripCommand } from "../../commands/trips/CreateTripCommand";
import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import ITripRepository from "../../../domain/repositories/trips/ITripRepository";
import { ResultTypes } from "../../../domain/types/enums";
import { tripSchema } from "../../validators/trips/CreateTripValidator";

export class CreateTripCommandHandler implements IHandler<ITrip> {
    constructor(private tripRepository: ITripRepository) { }

    async handle(command: CreateTripCommand): Promise<Result<ITrip | null>> {
        const { waypoints, tripDetails } = command.trip;

        const result = tripSchema.safeParse(command);

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const savedWaypoints = await Waypoint.insertMany(waypoints);
        const waypointIds = savedWaypoints.map(waypoint => waypoint._id);

        const trip = new Trip({
            tripDetails,
            waypoints: waypointIds,
            position: waypoints[0].position
        });

        const savedTrip = await this.tripRepository.create(trip);

        return Result.success(savedTrip, ResultTypes.CREATED, 201);
    }
}