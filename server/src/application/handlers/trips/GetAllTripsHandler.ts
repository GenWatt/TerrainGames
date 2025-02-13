import { ITrip } from "../../../domain/models/Trip";
import ITripRepository from "../../../domain/repositories/trips/ITripRepository";
import { Result } from "../../../domain/Result";
import { ResultTypes } from "../../../domain/types/enums";
import { GetAllTripsQuery } from "../../queries/trips/GetAllTripsQuery";
import { IHandler } from "../../types";
import { getAllTripsValidator } from "../../validators/trips/GetAllTripsValidator";

export class GetAllTripsHandler implements IHandler<ITrip[]> {
    constructor(
        private tripRepository: ITripRepository
    ) { }

    async handle(command: GetAllTripsQuery): Promise<Result<ITrip[]>> {
        const result = getAllTripsValidator.safeParse(command);

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.BAD_REQUEST, 400);
        }

        const trips = await this.tripRepository.getAllWithinBounds(
            command.neLat,
            command.neLng,
            command.swLat,
            command.swLng
        );

        return Result.success(trips, ResultTypes.SUCCESS, 200);
    }
}