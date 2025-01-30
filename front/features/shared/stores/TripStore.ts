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
}

export enum AppModes {
    VIEW = 'VIEW',
    EDIT_TRIP = 'EDIT_TRIP',
    ACTIVE_TRIP = 'ACTIVE_TRIP',
    CREATE_TRIP = 'CREATE_TRIP',
    PAUSE_TRIP = 'PAUSE_TRIP',
}

export type TripStoreType = TripStateType & TripActionsType;

export const useTripStore = create<TripStoreType>((set, get) => ({
    selectedTrip: null,
    mode: AppModes.VIEW,

    selectTrip: (trip: ITrip | null) => set({ selectedTrip: trip }),
    deselectTrip: () => set({ selectedTrip: null }),

    changeMode: (mode: AppModes) => {
        const currentMode = get().mode;
        if (mode === AppModes.CREATE_TRIP && currentMode === AppModes.EDIT_TRIP) return;

        set({ mode })
    },
}));