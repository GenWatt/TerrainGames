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

export type Waypoint = (QuizWaypoint | InfoWaypoint | TaskWaypoint) & { _id?: string };

export type CreateTripStateType = {
    waypoints: Waypoint[];
    tripDetails: ITripDetails;

    isEditing: boolean;
    selectedWaypoint: Waypoint | null;
}

export type ITripDetails = {
    title: string;
    description: string;
    country: string;
    city: string;
}

export type ITrip = {
    _id?: string;
    title: string;
    description: string;
    waypoints: Waypoint[];
    country: string;
    city: string;
}

export type CreateTripActionsType = {
    setIsEditing: (isEditing: boolean) => void;
    addPosition: (position: Position) => void;
    clearPositions: () => void;
    selectWaypoint: (waypoint: Waypoint | null) => void;
    updateWaypoint: (waypoint: Waypoint) => void;
    getTrip: () => ITrip;
    updateTripDetails: (tripDetails: ITripDetails) => void;
}

export type CreateTripStoreType = CreateTripStateType & CreateTripActionsType;

export const useCreateTripStore = create<CreateTripStoreType>((set, get) => ({
    waypoints: [],
    tripDetails: {
        title: '',
        description: '',
        country: '',
        city: '',
    },

    isEditing: false,
    selectedWaypoint: null,

    setIsEditing: (isEditing: boolean) => set({ isEditing }),
    addPosition: (position: Position) => {
        const waypoints = get().waypoints;
        const waypoint: Waypoint = {
            type: WaypointTypes.INFO,
            position,
            title: 'Title',
            description: 'Description',
            imageUrls: [],
            text: 'Text',
        }

        set({ waypoints: [...waypoints, waypoint] });
    },
    clearPositions: () => set({ waypoints: [] }),
    selectWaypoint: (selectedWaypoint: Waypoint | null) => set({ selectedWaypoint }),
    updateWaypoint: (updatedWaypoint: Waypoint) => {
        const waypoints = get().waypoints.map(waypoint =>
            waypoint.position === updatedWaypoint.position ? updatedWaypoint : waypoint
        );
        set({ waypoints, selectedWaypoint: updatedWaypoint });
    },
    getTrip: () => {
        const { tripDetails, waypoints } = get();
        return { ...tripDetails, waypoints };
    },
    updateTripDetails: (tripDetails: ITripDetails) => set({ tripDetails }),
}));

