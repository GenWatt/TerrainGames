import Trip from "../../../domain/models/Trip";
import { Waypoint } from "../../../domain/models/Waypoint";
import { Result } from "../../../domain/Result";
import { ResultTypes } from "../../../services/AuthService";
import { DeleteTripCommand } from "../../commands/trips/DeleteTripCommand";
import { IHandler } from "../../types";

export class DeleteTripHandler implements IHandler {
    async handle(command: DeleteTripCommand) {
        const { tripId } = command;

        await Trip.findByIdAndDelete(tripId);
        await Waypoint.deleteMany({ trip: tripId });

        return Result.success(null, ResultTypes.DELETED, 204);
    }
}