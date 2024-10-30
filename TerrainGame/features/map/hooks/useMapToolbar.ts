import { useState } from 'react';
import { useCreateTripStore } from '@/store/createTripStore';
import { useMapStore } from '@/store/mapStore';
import { UserRole } from '@/types';

export type ToolbarAction = {
    name: string;
    icon: any;
    isToggle: boolean;
    roles?: UserRole[];
    activeColor?: string;
    selectedColor?: string;
};

export default function useMapToolbar() {
    const { clearPositions, setIsEditing } = useCreateTripStore((state) => state);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const camera = useMapStore((state) => state.camera);

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

    const handleToolbarAction = ({ name, isToggle }: ToolbarAction) => {
        console.log('handleToolbarAction', name);
        setIsEditing(false);
        if (name === 'create') {
            handleToogle(name);
        } else if (name === 'clear') {
            handleClearPress();
        } else if (name === 'fly' && camera) {
            console.log('fly');
            camera.flyTo([-71.06017112731934, 42.36272976137689], 12);
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
    ];

    return {
        actions,
        selectedAction,
        handleToolbarAction,
    };
}