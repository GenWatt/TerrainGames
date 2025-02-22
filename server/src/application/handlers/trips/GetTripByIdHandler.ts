import { inject, injectable } from "tsyringe";
import { ITrip } from "../../../domain/models/Trip";
import ITripRepository from "../../../domain/repositories/trips/ITripRepository";
import { Result } from "../../../domain/Result";
import { ResultTypes } from "../../../domain/types/enums";
import { GetTripByIdQuery } from "../../queries/trips/GetTripByIdQuery";
import { IHandler } from "../../types";
import idSchema from "../../../shared/validators/IdValidator";
import TripRepository from "../../../core/repositories/TripRepository";

@injectable()
export class GetTripByIdHandler implements IHandler<ITrip> {
    constructor(
        @inject(TripRepository) private tripRepository: ITripRepository
    ) { }

    async handle(command: GetTripByIdQuery): Promise<Result<ITrip>> {
        const result = idSchema.safeParse(command);

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const trip = await this.tripRepository.get(command.tripId);

        if (!trip) {
            return Result.failure("Trip not found", ResultTypes.NOT_FOUND, 404);
        }

        return Result.success(trip, ResultTypes.SUCCESS, 200);
    }
}