import { useCallback, useState } from 'react';
import { ToolbarActionTypes, useCreateTripStore } from '@/features/shared/stores/createTripStore';
import { useMapStore } from '@/features/map/store/mapStore';
import { UserRole } from '@/types';
import { useRouter } from 'expo-router';

export type ToolbarAction = {
    name: ToolbarActionTypes;
    icon: any;
    isToggle: boolean;
    roles?: UserRole[];
    activeColor?: string;
    selectedColor?: string;
};

export default function useMapToolbar() {
    const { clearPositions, isEditing, selectAction, trip } = useCreateTripStore((state) => state);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const camera = useMapStore((state) => state.camera);

    const navigate = useRouter();

    const handleToolbarAction = async ({ name, isToggle }: ToolbarAction) => {
        console.log('handleToolbarAction', name);

        if (name === ToolbarActionTypes.ADD_POSITION) {
            // Toggle the action
            if (isToggle) {
                setSelectedAction(selectedAction === name ? null : name);
            }
        } else if (name === ToolbarActionTypes.DELETE_ALL) {
            handleClearPress();
        } else if (name === ToolbarActionTypes.FLT_TO && camera) {
            console.log('fly');
            camera.flyTo([-71.06017112731934, 42.36272976137689], 12);
        } else if (name === ToolbarActionTypes.ADD_TRIP) {
            console.log('save');
            navigate.push({ pathname: '/(modals)/createTripModal', params: { _id: trip._id } });
        }

        if (isToggle) {
            selectAction(name);
        }
    };

    const handleClearPress = () => {
        clearPositions();
    };

    const actions: ToolbarAction[] = [
        { icon: 'add', name: ToolbarActionTypes.ADD_POSITION, isToggle: true, roles: [UserRole.ADMIN], selectedColor: 'bg-primary' },
        { icon: 'trash', name: ToolbarActionTypes.DELETE_ALL, isToggle: false, roles: [UserRole.ADMIN], activeColor: 'active:bg-danger' },
        { icon: 'navigate', name: ToolbarActionTypes.FLT_TO, isToggle: false, activeColor: 'active:bg-primary' },
        { icon: isEditing ? 'create' : 'save', name: ToolbarActionTypes.ADD_TRIP, isToggle: false, roles: [UserRole.ADMIN], activeColor: 'active:bg-primary' },
    ];

    const handleToolbarActionCallback = useCallback(
        (action: ToolbarAction) => {
            handleToolbarAction(action);
        },
        [handleToolbarAction]
    );

    return {
        actions,
        selectedAction,
        handleToolbarActionCallback,
    };
}