import { create } from 'zustand';
import type { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { AppModes, useTripStore } from './TripStore';

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
    CANCEL = 'CANCEL',
    NONE = 'NONE',
}

export type CreateTripStateType = {
    trip: ITrip;

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
    tripDetails: ITripDetails;
    waypoints: IWaypoint[];
}

export type CreateTripActionsType = {
    setIsEditing: (isEditing: boolean) => void;
    addPosition: (position: Position) => void;
    removeWaypoint: (waypoint: IWaypoint) => void;
    clearPositions: () => void;

    selectWaypoint: (waypoint: IWaypoint | null) => void;
    deselectWaypoint: () => void;
    selectAction: (action: ToolbarActionTypes) => void;

    updateWaypoint: (waypoint: IWaypoint) => void;
    getTrip: () => ITrip;
    updateTripDetails: (tripDetails: ITripDetails) => void;
    editTrip: (trip: ITrip | null) => void;
}

export type CreateTripStoreType = CreateTripStateType & CreateTripActionsType;

const initialTrip: ITrip = {
    tripDetails: {
        title: '',
        description: '',
        country: '',
        city: '',
        position: {
            type: 'Point',
            coordinates: [0, 0],
        }
    },
    waypoints: [],
}

export const useCreateTripStore = create<CreateTripStoreType>((set, get) => ({
    trip: initialTrip,

    isEditing: false,
    selectedWaypoint: null,
    action: ToolbarActionTypes.NONE,

    setIsEditing: (isEditing: boolean) => set({ isEditing }),
    addPosition: (position: Position) => {
        const trip = get().trip;
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

        if (trip.waypoints.length === 0) {
            set({ trip: { ...trip, tripDetails: { ...trip.tripDetails, position: waypoint.position }, waypoints: [waypoint] } });
        } else {
            set({ trip: { ...trip, waypoints: [...trip.waypoints, waypoint] } });
        }
    },
    removeWaypoint: (waypoint: IWaypoint) => {
        const trip = get().trip;
        const waypoints = trip.waypoints.filter(wp => wp.position !== waypoint.position);

        set({ trip: { ...trip, waypoints } });
    },
    clearPositions: () => {
        const trip = get().trip;

        set({ trip: { ...trip, waypoints: [] } });
    },
    selectAction: (action: ToolbarActionTypes) => set({ action }),
    selectWaypoint: (selectedWaypoint: IWaypoint | null) => set({ selectedWaypoint }),
    deselectWaypoint: () => set({ selectedWaypoint: null }),

    updateWaypoint: (updatedWaypoint: IWaypoint) => {
        const trip = get().trip;
        const waypoints = trip.waypoints.map(waypoint => waypoint._id === updatedWaypoint._id ? updatedWaypoint : waypoint);

        set({ trip: { ...trip, waypoints }, selectedWaypoint: updatedWaypoint });
    },
    getTrip: () => {
        const { trip } = get();

        return trip;
    },
    updateTripDetails: (tripDetails: ITripDetails) => {
        const trip = get().trip;

        set({ trip: { ...trip, tripDetails } });
    },
    editTrip: (trip) => {
        if (!trip) {
            set({ trip: initialTrip, isEditing: false });

            useTripStore.getState().changeMode(AppModes.VIEW);
            return;
        }

        set({ trip, isEditing: true, });
        useTripStore.getState().changeMode(AppModes.EDIT_TRIP);
    }
}));