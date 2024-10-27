import { create } from 'zustand';
import type { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export type PathStore = {
    positions: Position[];
    isEditing: boolean;

    setIsEditing: () => void;
    addPosition: (position: Position) => void;
    clearPositions: () => void;
}

export const usePathStore = create<PathStore>((set) => ({
    positions: [],
    isEditing: false,

    setIsEditing: () => set((state) => ({ isEditing: !state.isEditing })),
    addPosition: (position: Position) => set((state) => ({ positions: [...state.positions, position] })),
    clearPositions: () => set({ positions: [] }),
}));

