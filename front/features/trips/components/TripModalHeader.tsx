import React from 'react';
import { View, Text } from 'react-native';
import CircleButton from '@/components/ui/Buttons/CircleButton';
import Ionicons from '@expo/vector-icons/Ionicons';

interface TripModalHeaderProps {
    isEditing: boolean;
    onClose: () => void;
}

const TripModalHeader: React.FC<TripModalHeaderProps> = ({ isEditing, onClose }) => (
    <View className="flex-row gap-2 items-end">
        <CircleButton onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="white" />
        </CircleButton>

        <Text className="text-lg text-primary">
            {isEditing ? 'Edit' : 'Create'} Trip Modal
        </Text>
    </View>
);

export default TripModalHeader;