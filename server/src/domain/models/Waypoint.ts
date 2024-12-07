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
    position: {
        type: 'Point';
        coordinates: [number, number];
    };
    title: string;
    description: string;
}

const waypointSchema = new Schema<IWaypoint>({
    type: { type: String, enum: Object.values(WaypointTypes), required: true },
    position: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { discriminatorKey: 'type', collection: 'waypoints' });

waypointSchema.index({ position: '2dsphere' });

export const Waypoint = model<IWaypoint>('Waypoint', waypointSchema);

// QUIZ

export interface IQuizWaypoint extends IWaypoint {
    quizes: IQuiz[];
}

const quizWaypointSchema = new Schema<IQuizWaypoint>({
    quizes: [{
        question: { type: String, required: true },
        imageUrls: { type: [String] },
        answers: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
        explanation: { type: String },
        answerTime: { type: Number },
    }]
});

export const QuizWaypoint = Waypoint.discriminator<IQuizWaypoint>('QUIZ', quizWaypointSchema);

// INFO
export interface IInfoWaypoint extends IWaypoint {
    imageUrls: string[];
}

const infoWaypointSchema = new Schema<IInfoWaypoint>({
    imageUrls: [String],
});

export const InfoWaypoint = Waypoint.discriminator<IInfoWaypoint>('INFO', infoWaypointSchema);