import { CreateTripCommand } from './commands/CreateTripCommand';
import { CreateTripCommandHandler } from './handlers/CreateTripHandler';
import { GetAllTripsHandler } from './handlers/GetTripsHandler';
import { GetAllTripsQuery } from './queries/GetAllTripsQuery';

class Mediator {
    private handlers = new Map();

    constructor() {
        this.handlers.set(CreateTripCommand, new CreateTripCommandHandler());
        this.handlers.set(GetAllTripsQuery, new GetAllTripsHandler());
    }

    async send(command: any) {
        const handler = this.handlers.get(command.constructor);
        if (handler) {
            return await handler.handle(command);
        }
        throw new Error('No handler found for this command');
    }
}

export const mediator = new Mediator();