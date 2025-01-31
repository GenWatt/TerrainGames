import { useCallback } from 'react';
import { ToolbarActionTypes, useCreateTripStore } from '@/features/shared/stores/createTripStore';
import { useMapStore } from '@/features/map/store/MapStore';
import { UserRole } from '@/types';
import { useRouter } from 'expo-router';
import { AppModes, useTripStore } from '@/features/shared/stores/TripStore';

export type ToolbarAction = {
    name: ToolbarActionTypes;
    icon: any;
    isToggle: boolean;
    isShow?: boolean;
    roles?: UserRole[];
    activeColor?: string;
    selectedColor?: string;
};

export interface useMapToolbarProps {
    location: number[];
}

export default function useMapToolbar({ location }: useMapToolbarProps) {
    const { clearPositions, isEditing, selectAction, trip, action, editTrip } = useCreateTripStore((state) => state);
    const camera = useMapStore((state) => state.camera);
    const { isEditOrCreateMode, canEnterEditMode } = useTripStore();

    const navigate = useRouter();

    const handleToolbarAction = async ({ name, isToggle }: ToolbarAction) => {
        console.log('handleToolbarAction', name);

        if (name === ToolbarActionTypes.ADD_POSITION) {

        } else if (name === ToolbarActionTypes.DELETE_ALL) {
            handleClearPress();
        } else if (name === ToolbarActionTypes.FLT_TO && camera) {
            console.log('fly');
            camera.flyTo(location, 12);
        } else if (name === ToolbarActionTypes.ADD_TRIP) {
            console.log('save');
            navigate.push({ pathname: '/(modals)/createTripModal', params: { _id: trip._id } });
        } else if (name === ToolbarActionTypes.CANCEL) {
            console.log('cancel');
            editTrip(null);
        }

        if (isToggle) {
            selectAction(action === name ? ToolbarActionTypes.NONE : name);
        }
    };

    const handleClearPress = () => {
        clearPositions();
    };

    const actions: ToolbarAction[] = [
        { icon: 'add', name: ToolbarActionTypes.ADD_POSITION, isToggle: true, roles: [UserRole.ADMIN], selectedColor: 'bg-primary', isShow: canEnterEditMode() },
        { icon: 'navigate', name: ToolbarActionTypes.FLT_TO, isToggle: false, activeColor: 'active:bg-primary', isShow: true },

        { icon: 'trash', name: ToolbarActionTypes.DELETE_ALL, isToggle: false, roles: [UserRole.ADMIN], activeColor: 'active:bg-danger', isShow: trip.waypoints.length > 0 },
        { icon: isEditing ? 'create' : 'save', name: ToolbarActionTypes.ADD_TRIP, isToggle: false, roles: [UserRole.ADMIN], activeColor: 'active:bg-primary', isShow: trip.waypoints.length > 1 },
        { icon: 'close', name: ToolbarActionTypes.CANCEL, isToggle: false, isShow: isEditOrCreateMode(), activeColor: 'active:bg-danger', roles: [UserRole.ADMIN] },
    ];

    const handleToolbarActionCallback = useCallback(
        (action: ToolbarAction) => {
            handleToolbarAction(action);
        },
        [handleToolbarAction]
    );

    return {
        actions,
        action,
        handleToolbarActionCallback,
    };
}