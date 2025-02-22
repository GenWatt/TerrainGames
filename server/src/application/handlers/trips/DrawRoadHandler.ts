import { DrawRoadCommand } from "../../commands/trips/DrawRoadCommand";
import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import { ResultTypes } from "../../../domain/types/enums";
import { MapBoxDistanceApiResponse, MapboxRoadType, Position } from "../../../domain/types";
import { axiosMapboxDirectionsInstance } from "../../../core/apiConfigs/mapboxDirectionConfig";
import { injectable } from "tsyringe";

@injectable()
export class DrawRoadHandler implements IHandler<MapboxRoadType> {

    async handle(command: DrawRoadCommand): Promise<Result<MapboxRoadType | null>> {
        const waypoints = command
            .waypoints
            .map((waypoint: Position) => `${waypoint[0]},${waypoint[1]}`).join(';');
        const response = await axiosMapboxDirectionsInstance.get<MapBoxDistanceApiResponse>(`/walking/${waypoints}?geometries=geojson`);

        if (response.status !== 200) {
            return Result.failure(response.statusText, ResultTypes.ROAD_ERROR, response.status);
        }

        if (response.data.routes.length === 0) {
            return Result.failure('No route found', ResultTypes.ROAD_ERROR, 404);
        }

        return Result.success(response.data.routes[0], ResultTypes.SUCCESS, 200);
    }
}