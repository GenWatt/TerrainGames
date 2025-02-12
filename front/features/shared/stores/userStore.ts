import { create } from 'zustand';
import { IUser, MetricType, Temperature, Theme, UserRole } from '@/types';

export type UserStore = {
    user: IUser;
    isLoggedIn: boolean;

    login: (user: IUser | undefined) => void;
    logout: () => void;
    hasRole: (role: UserRole) => boolean;
}

const initialState: IUser = {
    _id: '',
    username: '',
    email: '',
    role: UserRole.USER,
    googleId: '',
    avatar: '',
    accessToken: '',
    createdAt: new Date(),
    prefs: {
        theme: Theme.LIGHT,
        metricSystem: MetricType.METRIC,
        temperatureUnit: Temperature.CELSIUS
    },
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: initialState,
    isLoggedIn: false,

    login: (user) => set({ user, isLoggedIn: true }),
    logout: () => set({ user: initialState, isLoggedIn: false }),
    hasRole: (role) => {
        return get().user.role === role
    },
}));
