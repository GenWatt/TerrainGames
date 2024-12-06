import React from 'react';
import { View } from 'react-native';
import { useCreateTripStore, IWaypoint } from '@/store/createTripStore';
import WaypointDisplay from './WaypointDisplay';
import WaypointEdit from './WaypointEdit';
import { UserRole } from '@/types';
import useMe from '@/api/queries/useMe';

const Waypoint: React.FC = () => {
    const { selectedWaypoint, updateWaypoint, deselectWaypoint } = useCreateTripStore();
    const { user } = useMe();

    if (!selectedWaypoint) {
        return <></>;
    }

    const handleSave = (waypoint: IWaypoint) => {
        updateWaypoint(waypoint);
        deselectWaypoint();
    }

    console.log('selectedWaypoint', selectedWaypoint);
    return (
        <View>
            {user && user.role === UserRole.ADMIN ? (
                <WaypointEdit
                    waypoint={selectedWaypoint}
                    onSave={handleSave}
                />
            ) : (
                <WaypointDisplay waypoint={selectedWaypoint} />
            )}
        </View>
    );
};

export default Waypoint; 
