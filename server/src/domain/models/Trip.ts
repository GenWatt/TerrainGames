import mongoose, { Schema, Document } from 'mongoose';
import { IWaypoint } from './Waypoint';

export interface ITrip {
    title: string;
    description: string;
    waypoints: IWaypoint[];
    country: string;
    city: string;
}

export type ITripSchema = ITrip & Document;

const TripSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    waypoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint' }],
    country: { type: String, required: false },
    city: { type: String, required: false },
});

const Trip = mongoose.model<ITripSchema>('Trip', TripSchema);

export default Trip;