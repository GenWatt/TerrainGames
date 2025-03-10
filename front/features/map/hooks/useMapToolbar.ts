import { useCallback, useState } from 'react';
import { useCreateTripStore } from '@/features/shared/stores/createTripStore';
import { useMapStore } from '@/features/map/store/MapStore';
import { UserRole } from '@/types';
import { useRouter } from 'expo-router';
import useFeatureFlags from '@/features/shared/hooks/useFeatureFlags';
import { ToolbarActionFeatures } from '@/features/shared/types';

export type ToolbarAction = {
    name: ToolbarActionFeatures;
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
    const { isFeatureAvailable } = useFeatureFlags();
    const [isToolbarOpen, setIsToolbarOpen] = useState(false);

    const navigate = useRouter();

    const handleToolbarAction = async ({ name, isToggle }: ToolbarAction) => {
        if (name === ToolbarActionFeatures.DELETE_ALL_WAYPOINTS) {
            handleClearPress();
        } else if (name === ToolbarActionFeatures.FLY_TO && camera) {
            camera.flyTo(location, 12);
        } else if (name === ToolbarActionFeatures.SAVE_TRIP) {
            navigate.push({ pathname: '/(modals)/createTripModal', params: { _id: trip._id } });
        } else if (name === ToolbarActionFeatures.CANCEL_TRIP) {
            editTrip(null);
        }

        if (isToggle) {
            selectAction(action === name ? ToolbarActionFeatures.NONE : name);
        }
    };

    const handleClearPress = () => {
        clearPositions();
    };

    const actions: ToolbarAction[] = [
        { icon: 'add', name: ToolbarActionFeatures.ADD_WAYPOINT, isToggle: true, selectedColor: 'bg-primary', isShow: isFeatureAvailable(ToolbarActionFeatures.ADD_WAYPOINT) },
        { icon: 'navigate', name: ToolbarActionFeatures.FLY_TO, isToggle: false, activeColor: 'active:bg-primary', isShow: true },

        { icon: 'trash', name: ToolbarActionFeatures.DELETE_ALL_WAYPOINTS, isToggle: false, roles: [UserRole.ADMIN], activeColor: 'active:bg-danger', isShow: isFeatureAvailable(ToolbarActionFeatures.DELETE_ALL_WAYPOINTS) },
        { icon: isEditing ? 'create' : 'save', name: ToolbarActionFeatures.SAVE_TRIP, isToggle: false, roles: [UserRole.ADMIN], activeColor: 'active:bg-primary', isShow: isFeatureAvailable(ToolbarActionFeatures.SAVE_TRIP) },
        { icon: 'close', name: ToolbarActionFeatures.CANCEL_TRIP, isToggle: false, isShow: isFeatureAvailable(ToolbarActionFeatures.CANCEL_TRIP), activeColor: 'active:bg-danger', roles: [UserRole.ADMIN] },
    ];

    const handleToolbarActionCallback = useCallback((action: ToolbarAction) => {
        handleToolbarAction(action);
    }, [handleToolbarAction]);

    const handleToggleToolbar = () => {
        setIsToolbarOpen(!isToolbarOpen);
    };

    return {
        actions,
        action,
        isToolbarOpen,
        handleToolbarActionCallback,
        handleToggleToolbar
    };
}