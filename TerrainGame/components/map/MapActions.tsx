import { View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import CircleButton from '../ui/Buttons/CircleButton'
import { usePathStore } from '@/store/createPathStore';

export default function MapActions() {
    const clearAllPositions = usePathStore((state) => state.clearPositions);
    const setIsEditing = usePathStore((state) => state.setIsEditing);

    const handleCreatePathPress = () => {
        setIsEditing();
    }

    return (
        <View>
            <CircleButton className='absolute top-2 right-2 z-10' onPress={handleCreatePathPress}>
                <Ionicons name="add" size={24} color="white" />
            </CircleButton>

            <CircleButton className='absolute top-2 left-2 z-10' onPress={clearAllPositions}>
                <Ionicons name="trash" size={24} color="white" />
            </CircleButton>
        </View>
    )
}