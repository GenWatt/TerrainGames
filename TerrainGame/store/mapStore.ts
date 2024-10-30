import { Camera } from '@rnmapbox/maps';
import { create } from 'zustand';

export type MapStoreSateType = {
    camera: Camera | null;
}

export type MapStoreActionsType = {
    setMapCamera: (map: Camera) => void;
}

export type MapStoreType = MapStoreSateType & MapStoreActionsType;

const initialState: MapStoreSateType = {
    camera: null,
}

export const useMapStore = create<MapStoreType>((set) => ({
    ...initialState,
    setMapCamera: (camera: Camera) => set({ camera }),
}));