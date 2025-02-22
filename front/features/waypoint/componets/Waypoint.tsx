import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useCreateTripStore, IWaypoint } from '@/features/shared/stores/createTripStore';
import WaypointDisplay from './WaypointDisplay';
import WaypointEdit from './WaypointEdit';
import { useRouter } from 'expo-router';
import { useTripStore } from '@/features/shared/stores/TripStore';
import Header from '@/components/ui/Header';

const Waypoint: React.FC = () => {
    const { selectedWaypoint, updateWaypoint, deselectWaypoint, removeWaypoint } = useCreateTripStore();
    const router = useRouter();
    const { isEditOrCreateMode } = useTripStore();

    if (!selectedWaypoint) {
        return <View>
            <Text>Waypoint not selected</Text>
        </View>;
    }

    const handleSave = (waypoint: IWaypoint) => {
        updateWaypoint(waypoint);
        back();
    }

    const handleDelete = (waypoint: IWaypoint) => {
        removeWaypoint(waypoint);
        back();
    }

    const back = () => {
        deselectWaypoint();
        router.back();
    }

    return (
        <ScrollView>
            {isEditOrCreateMode() ? (
                <>
                    <Header title={`Edit ${selectedWaypoint.title} waypoint`} />
                    <WaypointEdit
                        waypoint={selectedWaypoint}
                        onSave={handleSave}
                        onDelete={handleDelete}
                    />
                </>
            ) : (
                <>
                    <Header title={`See '${selectedWaypoint.title}' waypoint`} />
                    <WaypointDisplay waypoint={selectedWaypoint} />
                </>
            )}
        </ScrollView>
    );
};

export default Waypoint; 
