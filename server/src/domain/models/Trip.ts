import mongoose, { Schema, Document } from 'mongoose';
import { IWaypoint } from './Waypoint';

export interface ITrip {
    title: string;
    description: string;
    waypoints: IWaypoint[];
    country: string;
    city: string;
    position: {
        type: 'Point';
        coordinates: [number, number];
    };
}

export interface ITripNotPopulated {
    title: string;
    description: string;
    waypoints: string[];
    country: string;
    city: string;
    position: {
        type: 'Point';
        coordinates: [number, number];
    };
}

export type ITripSchema = ITrip & Document;

const TripSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    waypoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint' }],
    country: { type: String, required: false },
    city: { type: String, required: false },
    position: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
});

TripSchema.index({ position: '2dsphere' });

const Trip = mongoose.model<ITripSchema>('Trip', TripSchema);

export default Trip;