import { Schema, model, Document } from 'mongoose';

export interface IQuiz extends Document {
    question: string;
    imageUrls: string[];
    answers: string[];
    correctAnswer: string;
    explanation: string;
    answerTime: number;
}

const quizSchema = new Schema<IQuiz>({
    question: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    answers: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    answerTime: { type: Number, required: true },
});

export const Quiz = model<IQuiz>('Quiz', quizSchema);