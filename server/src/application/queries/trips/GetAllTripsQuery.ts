import { ICommand } from "../../types";

export class GetAllTripsQuery implements ICommand {
    constructor(
        // North east and south west corners of the map (Bounds)
        public readonly neLat: number,
        public readonly neLng: number,
        public readonly swLat: number,
        public readonly swLng: number,
    ) { }
}