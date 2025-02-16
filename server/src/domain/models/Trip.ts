import mongoose, { Schema, Document } from 'mongoose';
import { IWaypoint } from './Waypoint';

export interface ITrip {
    waypoints: IWaypoint[];
    tripDetails: ITripDetails;
}

export interface ITripDetails {
    title: string;
    description: string;
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
    tripDetails: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        position: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number, Number],
                required: true,
            },
        },
    },
    waypoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint' }],
});

TripSchema.index({ position: '2dsphere' });

const Trip = mongoose.model<ITripSchema>('Trip', TripSchema);

export default Trip;