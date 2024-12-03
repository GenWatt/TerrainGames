import { Request, Response, NextFunction } from 'express';
import { CreateTripCommand } from '../../application/commands/trips/CreateTripCommand';
import { mediator } from '../../application/mediator';
import { GetAllTripsQuery } from '../../application/queries/trips/GetAllTripsQuery';
import { DeleteTripCommand } from '../../application/commands/trips/DeleteTripCommand';

class TripController {
    public async create(req: Request, res: Response, next: NextFunction) {
        const result = await mediator.send(new CreateTripCommand(req.body.trip));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result.error);
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const result = await mediator.send(new GetAllTripsQuery());

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result.error);
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        console.log(req.params.id);
        const result = await mediator.send(new DeleteTripCommand(req.params.id));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result.error);
    }
}

export default TripController;