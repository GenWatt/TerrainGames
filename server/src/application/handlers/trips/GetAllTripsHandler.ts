import { ITrip } from "../../../domain/models/Trip";
import ITripRepository from "../../../domain/repositories/trips/ITripRepository";
import { Result } from "../../../domain/Result";
import { ResultTypes } from "../../../services/AuthService";
import { GetAllTripsQuery } from "../../queries/trips/GetAllTripsQuery";
import { IHandler } from "../../types";

export class GetAllTripsHandler implements IHandler<ITrip[]> {
    constructor(
        private tripRepository: ITripRepository
    ) { }

    async handle(command: GetAllTripsQuery) {
        const trips = await this.tripRepository.getAll();

        return Result.success(trips, ResultTypes.GET, 200);
    }
}