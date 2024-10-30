import { create } from 'zustand';
import { IUser, Theme, UserRole } from '@/types';

export type UserStore = {
    user: IUser;
    setUser: (user: IUser) => void;
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
    },
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: initialState,

    setUser: (user: IUser) => set({ user }),
    logout: () => set({ user: initialState }),
    hasRole: (role: UserRole) => {
        console.log(get().user.role);
        return get().user.role === role
    },
}));
