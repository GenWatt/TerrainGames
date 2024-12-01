import React from 'react';
import { View, Text, Button } from 'react-native';
import { Waypoint } from '@/store/createTripStore';
import CustomInput from '@/components/ui/CustomInput';

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
                <Text>Title</Text>
                <CustomInput
                    placeholder="Title"
                    value={editedWaypoint.title}
                    onChangeText={(value) => setEditedWaypoint({ ...editedWaypoint, title: value })}
                />

            </View>

            <View className="mb-4">
                <Text>Description</Text>
                <CustomInput
                    placeholder="Description"
                    value={editedWaypoint.description}
                    onChangeText={(value) => setEditedWaypoint({ ...editedWaypoint, description: value })}
                />
            </View>

            <Button title="Submit" onPress={handleSave} />
        </View>
    );
};

export default WaypointEdit;