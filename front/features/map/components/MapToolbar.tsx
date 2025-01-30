import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CircleButton from '../../../components/ui/Buttons/CircleButton';
import useMe from '@/features/shared/api/useMe';
import useMapToolbar, { ToolbarAction } from '../hooks/useMapToolbar';

export default function MapToolbar() {
    const { actions, action: selectedAction, handleToolbarActionCallback } = useMapToolbar();

    return (
        <View className='absolute gap-2 right-2 top-2 z-10'>
            {actions.map((action) => (
                <ToolbarItem
                    key={action.name}
                    selected={selectedAction === action.name}
                    action={action}
                    onPress={handleToolbarActionCallback}
                />
            ))}
        </View>
    );
}
export interface ToolbarItemProps {
    selected: boolean;
    action: ToolbarAction;
    onPress: (action: ToolbarAction) => void;
}

function ToolbarItem({ selected, action, onPress }: ToolbarItemProps) {
    const { user } = useMe();

    if (user && action.roles && !action.roles.includes(user.role)) {
        return null;
    }

    const { selectedColor, activeColor, icon, isToggle } = action;
    const finalClass = selected ? `${selectedColor} ${activeColor}` : `${activeColor}`;

    const handlePress = () => {
        onPress(action);
    };

    return (
        <CircleButton
            className={finalClass}
            onPress={handlePress}
        >
            <Ionicons name={icon} size={24} color={selected ? "black" : "white"} />
        </CircleButton>
    );
}