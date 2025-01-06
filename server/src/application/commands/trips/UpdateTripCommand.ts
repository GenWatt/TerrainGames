import { ICommand } from '../../types';
import { ITrip } from '../../../domain/models/Trip';

export class UpdateTripCommand implements ICommand {
    constructor(
        public tripId: string,
        public trip: ITrip
    ) { }
}