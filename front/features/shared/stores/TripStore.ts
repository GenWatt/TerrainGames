import { ITrip } from '@/features/shared/stores/createTripStore';
import { create } from 'zustand';

export type TripStateType = {
    selectedTrip: ITrip | null;
    mode: AppModes;
}

export type TripActionsType = {
    selectTrip: (trip: ITrip | null) => void;
    deselectTrip: () => void;

    changeMode: (mode: AppModes) => void;
    isEditOrCreateMode: () => boolean;
    canEnterEditMode: () => boolean;
}

export enum AppModes {
    VIEW = 'VIEW',
    EDIT_TRIP = 'EDIT_TRIP',
    ACTIVE_TRIP = 'ACTIVE_TRIP',
    CREATE_TRIP = 'CREATE_TRIP',
    PAUSE_TRIP = 'PAUSE_TRIP',
    SELECTED_TRIP = 'SELECTED_TRIP',
}

export type TripStoreType = TripStateType & TripActionsType;

export const useTripStore = create<TripStoreType>((set, get) => ({
    selectedTrip: null,
    mode: AppModes.VIEW,

    selectTrip: (trip: ITrip | null) => {
        set({ selectedTrip: trip, mode: AppModes.SELECTED_TRIP })
    },
    deselectTrip: () => {
        if (get().mode === AppModes.ACTIVE_TRIP) return;

        set({ selectedTrip: null, mode: AppModes.VIEW })
    },

    changeMode: (mode: AppModes) => {
        const currentMode = get().mode;
        if (mode === AppModes.CREATE_TRIP && currentMode === AppModes.EDIT_TRIP) return;

        set({ mode })
    },
    isEditOrCreateMode: () => {
        const mode = get().mode;
        return mode === AppModes.EDIT_TRIP || mode === AppModes.CREATE_TRIP;
    },
    canEnterEditMode: () => {
        const mode = get().mode;
        return mode !== AppModes.ACTIVE_TRIP && mode !== AppModes.SELECTED_TRIP;
    }
}));