import { useCallback, useState } from 'react';
import { ToolbarActionTypes, useCreateTripStore } from '@/store/createTripStore';
import { useMapStore } from '@/store/mapStore';
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
    const { clearPositions, setIsEditing, isEditing, selectAction } = useCreateTripStore((state) => state);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const camera = useMapStore((state) => state.camera);

    const navigate = useRouter();

    const handleToogle = (actionName: string) => {
        // if (selectedAction === actionName) {
        //     setIsEditing(false);
        //     return;
        // }

        // setIsEditing(true);
    };

    const handleClearPress = () => {
        clearPositions();
    };

    const handleToolbarAction = async ({ name, isToggle }: ToolbarAction) => {
        console.log('handleToolbarAction', name);

        if (name === ToolbarActionTypes.ADD_POSITION) {
            handleToogle(name);
        } else if (name === ToolbarActionTypes.DELETE_ALL) {
            handleClearPress();
        } else if (name === ToolbarActionTypes.FLT_TO && camera) {
            console.log('fly');
            camera.flyTo([-71.06017112731934, 42.36272976137689], 12);
        } else if (name === ToolbarActionTypes.ADD_TRIP) {
            console.log('save');
            navigate.push({ pathname: '/(modals)/createTripModal' });
        }

        if (isToggle && selectedAction !== name) {
            selectAction(name);
            return;
        }

        setSelectedAction(null);
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
    )

    return {
        actions,
        selectedAction,
        handleToolbarActionCallback,
    };
}