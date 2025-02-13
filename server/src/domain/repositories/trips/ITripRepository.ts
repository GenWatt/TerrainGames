import { ITrip } from "../../models/Trip";
import IRepository from "../IRepository";

export default interface ITripRepository extends IRepository<ITrip> {
    getAllWithinBounds(neLat: number, neLng: number, swLat: number, swLng: number): Promise<ITrip[]>
}