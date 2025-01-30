import React from 'react';
import { ScrollView, View } from 'react-native';
import { useCreateTripStore, IWaypoint } from '@/features/shared/stores/createTripStore';
import WaypointDisplay from './WaypointDisplay';
import WaypointEdit from './WaypointEdit';
import { UserRole } from '@/types';
import useMe from '@/features/shared/api/useMe';
import { useRouter } from 'expo-router';

const Waypoint: React.FC = () => {
    const { selectedWaypoint, updateWaypoint, deselectWaypoint, removeWaypoint } = useCreateTripStore();
    const { user } = useMe();
    const router = useRouter();

    if (!selectedWaypoint) {
        return <></>;
    }

    const handleSave = (waypoint: IWaypoint) => {
        console.log('waypoint', waypoint);
        updateWaypoint(waypoint);
        deselectWaypoint();
        router.back();
    }

    const handleDelete = (waypoint: IWaypoint) => {
        removeWaypoint(waypoint);
        deselectWaypoint();
        router.back();
    }

    console.log('selectedWaypoint', selectedWaypoint);
    return (
        <ScrollView>
            {user && user.role === UserRole.ADMIN ? (
                <WaypointEdit
                    waypoint={selectedWaypoint}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            ) : (
                <WaypointDisplay waypoint={selectedWaypoint} />
            )}
        </ScrollView>
    );
};

export default Waypoint; 
