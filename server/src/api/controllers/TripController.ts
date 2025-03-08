import { Request, Response, NextFunction } from 'express';
import { CreateTripCommand } from '@application/commands/trips/CreateTripCommand';
import { GetAllTripsQuery } from '@application/queries/trips/GetAllTripsQuery';
import { DeleteTripCommand } from '@application/commands/trips/DeleteTripCommand';
import { IMediator } from '@application/Mediator';
import { UpdateTripCommand } from '@application/commands/trips/UpdateTripCommand';
import { DrawRoadCommand } from '@application/commands/trips/DrawRoadCommand';
import { GetTripByIdQuery } from '@application/queries/trips/GetTripByIdQuery';
import { inject, injectable } from 'tsyringe';
import { Bounds } from '@domain/types';

@injectable()
class TripController {
    constructor(
        @inject('IMediator') private mediator: IMediator
    ) { }

    public async create(req: Request, res: Response, next: NextFunction) {
        const result = await this.mediator.send(new CreateTripCommand(req.body.trip));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }

    public async getAll(req: Request<null, null, null, Bounds>, res: Response, next: NextFunction) {
        const { neLat, neLng, swLat, swLng } = req.query;

        const result = await this.mediator.send(new GetAllTripsQuery(+neLat, +neLng, +swLat, +swLng));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        const result = await this.mediator.send(new GetTripByIdQuery(req.params.id));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const result = await this.mediator.send(new DeleteTripCommand(req.params.id));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const result = await this.mediator.send(new UpdateTripCommand(req.params.id, req.body.trip));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }

    public async drawRoad(req: Request, res: Response, next: NextFunction) {
        const result = await this.mediator.send(new DrawRoadCommand(req.body.waypoints));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }
}

export default TripController;