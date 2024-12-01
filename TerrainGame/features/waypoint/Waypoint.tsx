import React from 'react';
import { View } from 'react-native';
import { useCreateTripStore } from '@/store/createTripStore';
import WaypointDisplay from './WaypointDisplay';
import WaypointEdit from './WaypointEdit';
import { UserRole } from '@/types';
import useMe from '@/api/queries/useMe';

const Waypoint: React.FC = () => {
    const { selectedWaypoint, updateWaypoint } = useCreateTripStore();
    const { user } = useMe();

    if (!selectedWaypoint) {
        return <></>;
    }

    return (
        <View>
            {user && user.role === UserRole.ADMIN ? (
                <WaypointEdit
                    waypoint={selectedWaypoint}
                    onSave={(waypoint) => {
                        updateWaypoint(waypoint);
                    }}
                />
            ) : (
                <WaypointDisplay waypoint={selectedWaypoint} />
            )}
        </View>
    );
};

export default Waypoint; 
