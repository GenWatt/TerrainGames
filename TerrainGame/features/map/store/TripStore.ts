import { ITrip } from '@/store/createTripStore';
import { create } from 'zustand';

export type TripStateType = {
    selectedTrip: ITrip | null;
}

export type TripActionsType = {
    selectTrip: (trip: ITrip | null) => void;
    deselectTrip: () => void;
}

export type TripStoreType = TripStateType & TripActionsType;

export const useTripStore = create<TripStoreType>((set) => ({
    selectedTrip: null,

    selectTrip: (trip: ITrip | null) => set({ selectedTrip: trip }),
    deselectTrip: () => set({ selectedTrip: null }),
}));