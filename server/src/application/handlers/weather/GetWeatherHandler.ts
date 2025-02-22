import { IHandler } from "../../types";
import { Result } from "../../../domain/Result";
import { ResultTypes } from "../../../domain/types/enums";
import { GetWeatherQuery } from "../../queries/weather/GetWeatherQuery";
import { axiosOpenWeatherInstance } from '../../../core/apiConfigs/openWeatherConfig';
import { injectable } from "tsyringe";
import { WeatherValidator } from "../../validators/weather/WeatherValidator";
import { WeatherResponse } from "../../../domain/types";

@injectable()
export class GetWeatherHandler implements IHandler<WeatherResponse> {

    public async handle(command: GetWeatherQuery): Promise<Result<WeatherResponse>> {
        const { latitude, longitude } = command;

        const result = WeatherValidator.safeParse({ latitude, longitude });

        if (!result.success) {
            return Result.failure(result.error.errors.map(e => e.message).join(", "), ResultTypes.VALIDATION_ERROR, 400);
        }

        const response = await axiosOpenWeatherInstance.get<WeatherResponse>('/', {
            params: {
                lat: latitude,
                lon: longitude
            }
        });

        if (response.status !== 200) {
            return Result.failure(response.statusText, ResultTypes.WEATHER_ERROR, response.status)
        }

        return Result.success(response.data, ResultTypes.SUCCESS, 200);
    }
}