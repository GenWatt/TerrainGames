import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CircleButton from '../../../components/ui/Buttons/CircleButton';
import useMe from '@/features/shared/api/useMe';
import useMapToolbar, { ToolbarAction } from '../hooks/useMapToolbar';
import Colors from '@/constants/Colors';

export interface MapToolbarProps {
    location: number[];
}

export default function MapToolbar({ location }: MapToolbarProps) {
    const {
        actions,
        action: selectedAction,
        isToolbarOpen,
        handleToolbarActionCallback,
        handleToggleToolbar } = useMapToolbar({ location });

    return (
        <View className='absolute gap-2 right-2 top-2 z-10 flex-row'>
            <CircleButton
                onPress={handleToggleToolbar}>
                <Ionicons
                    name={isToolbarOpen ? 'arrow-forward' : 'arrow-back'}
                    size={24}
                    color={Colors.dark.foreground} />
            </CircleButton>

            {isToolbarOpen && <View className='gap-1'>
                {actions.map((action) => (
                    <ToolbarItem
                        key={action.name}
                        selected={selectedAction === action.name}
                        action={action}
                        onPress={handleToolbarActionCallback}
                    />
                ))}
            </View>}
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

    const { selectedColor, activeColor, icon } = action;
    const finalClass = selected ? `${selectedColor} ${activeColor}` : `${activeColor}`;

    const handlePress = () => {
        onPress(action);
    };

    return (
        <CircleButton
            disabled={!action.isShow}
            className={finalClass}
            onPress={handlePress}
        >
            <Ionicons name={icon} size={24} color={selected ? Colors.dark.background : Colors.dark.foreground} />
        </CircleButton>
    );
}