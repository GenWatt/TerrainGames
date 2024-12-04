import { useCallback, useState } from 'react';
import { useCreateTripStore } from '@/store/createTripStore';
import { useMapStore } from '@/store/mapStore';
import { UserRole } from '@/types';
import useSaveTripMutation from '@/api/mutations/useSaveTripMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRouter } from 'expo-router';

export type ToolbarAction = {
    name: string;
    icon: any;
    isToggle: boolean;
    roles?: UserRole[];
    activeColor?: string;
    selectedColor?: string;
};

export default function useMapToolbar() {
    const { clearPositions, setIsEditing, getTrip } = useCreateTripStore((state) => state);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const camera = useMapStore((state) => state.camera);
    const { mutateAsync } = useSaveTripMutation();
    const queryClient = useQueryClient();
    const navigate = useRouter();

    const handleToogle = (actionName: string) => {
        if (selectedAction === actionName) {
            setIsEditing(false);
            return;
        }

        setIsEditing(true);
    };

    const handleClearPress = () => {
        clearPositions();
    };

    const handleToolbarAction = async ({ name, isToggle }: ToolbarAction) => {
        console.log('handleToolbarAction', name);
        setIsEditing(false);
        if (name === 'create') {
            handleToogle(name);
        } else if (name === 'clear') {
            handleClearPress();
        } else if (name === 'fly' && camera) {
            console.log('fly');
            camera.flyTo([-71.06017112731934, 42.36272976137689], 12);
        } else if (name === 'save') {
            console.log('save');
            navigate.push({ pathname: '/(modals)/createTripModal' });
            // await mutateAsync(getTrip());
            // queryClient.invalidateQueries({ queryKey: ['trips'] });
        }

        if (isToggle && selectedAction !== name) {
            setSelectedAction(name);
            return;
        }

        setSelectedAction(null);
    };

    const actions: ToolbarAction[] = [
        { icon: 'add', name: 'create', isToggle: true, roles: [UserRole.ADMIN], selectedColor: 'bg-primary' },
        { icon: 'trash', name: 'clear', isToggle: false, roles: [UserRole.ADMIN], activeColor: 'active:bg-danger' },
        { icon: 'navigate', name: 'fly', isToggle: false, activeColor: 'active:bg-primary' },
        { icon: 'save', name: 'save', isToggle: false, roles: [UserRole.ADMIN], activeColor: 'active:bg-primary' },
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