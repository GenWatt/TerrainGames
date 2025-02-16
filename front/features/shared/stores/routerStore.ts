import { create } from 'zustand';

export interface RouterStore {
    currentPath: string;

    setCurrentPath: (path: string) => void;
}

export const useRouterStore = create<RouterStore>((set) => ({
    currentPath: '/(tabs)',

    setCurrentPath: (path) => set({ currentPath: path }),
}));
