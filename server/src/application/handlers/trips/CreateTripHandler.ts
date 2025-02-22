import Trip, { ITrip } from "../../../domain/models/Trip";
import { Waypoint } from "../../../domain/models/Waypoint";
import { CreateTripCommand } from "../../commands/trips/CreateTripCommand";
import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import ITripRepository from "../../../domain/repositories/trips/ITripRepository";
import { ResultTypes } from "../../../domain/types/enums";
import { tripSchema } from "../../validators/trips/CreateTripValidator";
import { inject, injectable } from "tsyringe";
import TripRepository from "../../../core/repositories/TripRepository";
import { Logger } from "winston";

@injectable()
export class CreateTripCommandHandler implements IHandler<ITrip> {
    constructor(
        @inject(TripRepository) private tripRepository: ITripRepository,
        @inject(Logger) private logger: Logger
    ) { }

    async handle(command: CreateTripCommand): Promise<Result<ITrip | null>> {
        const { waypoints, tripDetails } = command.trip;
        const result = tripSchema.safeParse(command);

        if (!result.success) {
            this.logger.error(`Validation failed: ${result.error.errors.map(e => e.message).join(", ")}`);
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const savedWaypoints = await Waypoint.insertMany(waypoints);
        this.logger.info(`Waypoints saved: ${savedWaypoints.map(waypoint => waypoint._id).join(", ")}`);

        const waypointIds = savedWaypoints.map(waypoint => waypoint._id);

        const trip = new Trip({
            tripDetails,
            waypoints: waypointIds,
            position: waypoints[0].position,
        });

        const savedTrip = await this.tripRepository.create(trip);
        this.logger.info(`Trip saved: ${savedTrip._id}`);

        return Result.success(savedTrip, ResultTypes.CREATED, 201);
    }
}