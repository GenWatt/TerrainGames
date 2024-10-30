import { create } from 'zustand';
import type { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export enum WaypointTypes {
    QUIZ = 'QUIZ',
    INFO = 'INFO',
    TASK = 'TASK',
    START = 'START',
    END = 'END',
}

export type Quiz = {
    question: string;
    imageUrls: string[];
    answers: string[];
    correctAnswer: string;
    explanation: string;
    answerTime: number;
}

export type QuizWaypoint = {
    type: WaypointTypes.QUIZ;
    position: Position;
    title: string;
    description: string;
    quizes: Quiz[];
};

export type InfoWaypoint = {
    type: WaypointTypes.INFO;
    position: Position;
    title: string;
    description: string;
    imageUrls: string[];
    text: string;
};

export type TaskWaypoint = {
    type: WaypointTypes.TASK;
    position: Position;
    title: string;
    description: string;
    imageUrls: string[];
    taskDescription: string;
    taskImages: string[];
};

export type Waypoint = QuizWaypoint | InfoWaypoint | TaskWaypoint;

export type CreateTripStateType = {
    waypoints: Waypoint[];
    isEditing: boolean;
    selectedWaypoint: Waypoint | null;
}

export type CreateTripActionsType = {
    setIsEditing: (isEditing: boolean) => void;
    addPosition: (position: Position) => void;
    clearPositions: () => void;
    selectWaypoint: (waypoint: Waypoint | null) => void;
}

export type CreateTripStoreType = CreateTripStateType & CreateTripActionsType;

export const useCreateTripStore = create<CreateTripStoreType>((set, get) => ({
    waypoints: [],
    isEditing: false,
    selectedWaypoint: null,

    setIsEditing: (isEditing: boolean) => set({ isEditing }),
    addPosition: (position: Position) => {
        const waypoints = get().waypoints;
        const lastWaypoint = waypoints[waypoints.length - 1];
        if (lastWaypoint && lastWaypoint.type === WaypointTypes.QUIZ) {
            lastWaypoint.position = position;
            set({ waypoints: [...waypoints] });
        } else {
            set({ waypoints: [...waypoints, { type: WaypointTypes.QUIZ, position, title: '', description: '', quizes: [] }] });
        }
    },
    clearPositions: () => set({ waypoints: [] }),
    selectWaypoint: (selectedWaypoint: Waypoint | null) => set({ selectedWaypoint }),
}));

