import Trip, { ITrip } from "../../domain/models/Trip";
import ITripRepository from "../../domain/repositories/trips/ITripRepository";

export default class TripRepository implements ITripRepository {
    async create(trip: ITrip): Promise<ITrip> {
        return await Trip.create(trip);
    }

    async get(id: string) {
        return await Trip.findById(id);
    }

    async update(trip: ITrip, id: string) {
        return await Trip.findByIdAndUpdate(id, trip, { new: true });
    }

    async delete(id: string) {
        await Trip.findByIdAndDelete(id);
    }

    async getAll(): Promise<ITrip[]> {
        return await Trip.find().populate('waypoints');
    }
}