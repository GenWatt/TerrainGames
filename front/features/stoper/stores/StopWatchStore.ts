import { create } from 'zustand';

interface StopwatchState {
    time: number; // Time in seconds
    isRunning: boolean;
    hasStarted: boolean; // if it was fired at least once

    start: (initialTime?: number) => void;
    pause: () => void;
    reset: () => void;
}

export const useStopwatchStore = create<StopwatchState>((set, get) => {
    let interval: NodeJS.Timeout | null = null;

    return {
        time: 0,
        isRunning: false,
        hasStarted: false,

        start: (initialTime = 0) => {
            if (get().isRunning) return;

            set({ time: initialTime, isRunning: true, hasStarted: true });

            interval = setInterval(() => {
                set((state) => ({ time: state.time + 1 }));
            }, 1000);
        },

        pause: () => {
            if (interval) clearInterval(interval);
            set({ isRunning: false });
        },

        reset: () => {
            if (interval) clearInterval(interval);
            set({ time: 0, isRunning: false, hasStarted: false });
        },
    };
});
