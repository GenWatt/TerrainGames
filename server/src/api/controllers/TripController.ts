import { Request, Response, NextFunction } from 'express';
import { CreateTripCommand } from '../../application/commands/CreateTripCommand';
import { mediator } from '../../application/mediator';
import { GetAllTripsQuery } from '../../application/queries/GetAllTripsQuery';

class TripController {
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const command = new CreateTripCommand(req.body.trip);
            const result = await mediator.send(command);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const command = new GetAllTripsQuery();
            const result = await mediator.send(command);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default TripController;