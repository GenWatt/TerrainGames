import React from 'react';
import { View, Text, Button } from 'react-native';
import { Waypoint } from '@/store/createTripStore';
import CustomInput from '@/components/ui/CustomInput';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';

interface WaypointEditProps {
    waypoint: Waypoint;
    onSave: (waypoint: Waypoint) => void;
}

const WaypointEdit: React.FC<WaypointEditProps> = ({ waypoint, onSave }) => {
    const [editedWaypoint, setEditedWaypoint] = React.useState(waypoint);

    const handleSave = () => {
        onSave(editedWaypoint);
    };

    return (
        <View className="justify-stretch w-full p-4">
            <View className="mb-4">
                <Text className='text-foreground mb-2'>Title</Text>
                <CustomInput
                    placeholder="Title"
                    value={editedWaypoint.title}
                    onChangeText={(value) => setEditedWaypoint({ ...editedWaypoint, title: value })}
                />

            </View>

            <View className="mb-4">
                <Text className='text-foreground mb-2'>Description</Text>
                <CustomInput
                    placeholder="Description"
                    value={editedWaypoint.description}
                    onChangeText={(value) => setEditedWaypoint({ ...editedWaypoint, description: value })}
                />
            </View>

            <CustomButton className='flex-row gap-2 items-center' onPress={handleSave}>
                <Ionicons name="save" size={24} color={Colors.dark.darkForeground} />
                <Text className="text-center text-2xl font-bold">Save</Text>
            </CustomButton>
        </View>
    );
};

export default WaypointEdit;