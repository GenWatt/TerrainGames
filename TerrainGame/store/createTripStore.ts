import { create } from 'zustand';
import type { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import Mapbox from '@rnmapbox/maps';

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
    position: {
        type: string;
        coordinates: Position;
    }
    title: string;
    description: string;
    quizes: Quiz[];
};

export type InfoWaypoint = {
    type: WaypointTypes.INFO;
    position: {
        type: string;
        coordinates: Position;
    }
    title: string;
    description: string;
    imageUrls: string[];
    text: string;
};

export type TaskWaypoint = {
    type: WaypointTypes.TASK;
    position: {
        type: string;
        coordinates: Position;
    }
    title: string;
    description: string;
    imageUrls: string[];
    taskDescription: string;
    taskImages: string[];
};

export type IWaypoint = (QuizWaypoint | InfoWaypoint | TaskWaypoint) & { _id?: string };

export enum ToolbarActionTypes {
    ADD_POSITION = 'ADD_POSITION',
    DELETE_ALL = 'DELETE_ALL',
    FLT_TO = 'FLT_TO',
    ADD_TRIP = 'ADD_TRIP',
    EDIT_TRIP = 'EDIT_TRIP',
    NONE = 'NONE',
}

export type CreateTripStateType = {
    waypoints: IWaypoint[];
    tripDetails: ITripDetails;

    isEditing: boolean;
    selectedWaypoint: IWaypoint | null;
    action: ToolbarActionTypes;
}

export type ITripDetails = {
    title: string;
    description: string;
    country: string;
    city: string;
    position: {
        type: string;
        coordinates: Position;
    }
}

export type ITrip = {
    _id?: string;
    title: string;
    description: string;
    waypoints: IWaypoint[];
    country: string;
    city: string;
    position: {
        type: string;
        coordinates: Position;
    }
}

export type CreateTripActionsType = {
    setIsEditing: (isEditing: boolean) => void;
    addPosition: (position: Position) => void;
    clearPositions: () => void;

    selectWaypoint: (waypoint: IWaypoint | null) => void;
    deselectWaypoint: () => void;
    selectAction: (action: ToolbarActionTypes) => void;

    updateWaypoint: (waypoint: IWaypoint) => void;
    getTrip: () => ITrip;
    updateTripDetails: (tripDetails: ITripDetails) => void;
    editTrip: (trip: ITrip) => void;
}

export type CreateTripStoreType = CreateTripStateType & CreateTripActionsType;

export const useCreateTripStore = create<CreateTripStoreType>((set, get) => ({
    waypoints: [],
    tripDetails: {
        title: '',
        description: '',
        country: '',
        city: '',
        position: {
            type: 'Point',
            coordinates: []
        }
    },

    isEditing: false,
    selectedWaypoint: null,
    action: ToolbarActionTypes.NONE,

    setIsEditing: (isEditing: boolean) => set({ isEditing }),
    addPosition: (position: Position) => {
        const waypoints = get().waypoints;
        const waypoint: IWaypoint = {
            type: WaypointTypes.INFO,
            position: {
                type: 'Point',
                coordinates: position,
            },
            title: 'Title',
            description: 'Description',
            imageUrls: [],
            text: 'Text',
        }

        set({ waypoints: [...waypoints, waypoint] });
    },
    clearPositions: () => set({ waypoints: [] }),
    selectAction: (action: ToolbarActionTypes) => set({ action }),
    selectWaypoint: (selectedWaypoint: IWaypoint | null) => set({ selectedWaypoint }),
    deselectWaypoint: () => set({ selectedWaypoint: null }),

    updateWaypoint: (updatedWaypoint: IWaypoint) => {
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
    editTrip: (trip: ITrip) => {
        set({
            waypoints: trip.waypoints,
            tripDetails: {
                title: trip.title,
                description: trip.description,
                country: trip.country,
                city: trip.city,
                position: trip.position
            },
            isEditing: true,
        });
    }
}));

