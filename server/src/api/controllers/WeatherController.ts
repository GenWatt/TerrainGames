import { IMediator } from '../../application/Mediator';
import { Request, Response, NextFunction } from 'express';
import { GetWeatherQuery } from '../../application/queries/weather/GetWeatherQuery';
import { inject, injectable } from 'tsyringe';

@injectable()
class WeatherController {
    constructor(
        @inject('IMediator') private mediator: IMediator
    ) { }

    public async get(req: Request, res: Response, next: NextFunction) {
        const { latLong } = req.params;
        const [latitude, longitude] = latLong.split(',');

        const result = await this.mediator.send(new GetWeatherQuery(
            +latitude,
            +longitude));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }
}

export default WeatherController;