import mongoose, { Schema, Document } from 'mongoose';
import { IWaypoint } from './Waypoint';
import { MapboxRoadType } from '../types';

export interface ITrip {
    waypoints: IWaypoint[];
    tripDetails: ITripDetails;
    road: MapboxRoadType;
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

const StepSchema: Schema = new Schema({
    distance: { type: Number, required: false },
    duration: { type: Number, required: false },
    geometry: {
        coordinates: { type: [[Number, Number]], required: true },
        type: { type: String, required: true },
    },
    mode: { type: String, required: false },
    name: { type: String, required: false },
});

const LegSchema: Schema = new Schema({
    admins: {
        iso_3166_1_alpha3: { type: String, required: false },
        iso_3166_1: { type: String, required: false },
    },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true },
    steps: [StepSchema],
    summary: { type: String, required: true },
    via_waypoints: { type: [[Number, Number]], required: false },
    weight: { type: Number, required: false },
});

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
    road: {
        distance: { type: Number, required: true },
        duration: { type: Number, required: true },
        geometry: {
            coordinates: { type: [[Number, Number]], required: true },
            type: { type: String, required: true },
        },
        legs: [LegSchema],
        weight: { type: Number, required: true },
        weight_name: { type: String, required: false },
    },
});

TripSchema.index({ position: '2dsphere' });

const Trip = mongoose.model<ITripSchema>('Trip', TripSchema);

export default Trip;