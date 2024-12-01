import { Schema, model, Document } from 'mongoose';
import { IQuiz } from './Quiz';

export enum WaypointTypes {
    QUIZ = 'QUIZ',
    INFO = 'INFO',
    TASK = 'TASK',
    START = 'START',
    END = 'END',
}

export interface IWaypoint extends Document {
    type: WaypointTypes;
    position: [number, number];
    title: string;
    description: string;
    quizes?: IQuiz[];
    imageUrls?: string[];
    text?: string;
    taskDescription?: string;
    taskImages?: string[];
}

const waypointSchema = new Schema<IWaypoint>({
    type: { type: String, enum: Object.values(WaypointTypes), required: true },
    position: { type: [Number], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    quizes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    imageUrls: [String],
    text: String,
    taskDescription: String,
    taskImages: [String],
});

export const Waypoint = model<IWaypoint>('Waypoint', waypointSchema);