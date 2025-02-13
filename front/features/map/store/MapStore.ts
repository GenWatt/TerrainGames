import { Camera } from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { create } from 'zustand';

export type MapStoreSateType = {
    camera: Camera | null;
    currentMapPosition: Position;
    viewportBounds: [Position, Position];
}

export type MapStoreActionsType = {
    setMapCamera: (map: Camera) => void;
    setPositionAndBounds: (position: Position, bounds: [Position, Position]) => void;
}

export type MapStoreType = MapStoreSateType & MapStoreActionsType;

const initialState: MapStoreSateType = {
    camera: null,
    currentMapPosition: [0, 0],
    viewportBounds: [[0, 0], [0, 0]],
}

export const useMapStore = create<MapStoreType>((set) => ({
    ...initialState,

    setMapCamera: (camera: Camera) => set({ camera }),
    setPositionAndBounds: (currentMapPosition, viewportBounds) => set({ currentMapPosition, viewportBounds }),
}));