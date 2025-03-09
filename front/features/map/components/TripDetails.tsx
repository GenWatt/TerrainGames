import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useCallback, useRef, useState } from 'react'
import { ITrip, useCreateTripStore } from '@/features/shared/stores/createTripStore';
import { View, Text } from 'react-native';
import WaypointList from '@/features/shared/componets/waypoint/WaypointList';
import Badge from '@/components/ui/Badge';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppModes, useTripStore } from '@/features/shared/stores/TripStore';
import WithRoles from '@/features/shared/componets/auth/WithRoles';
import AdminActions from '@/features/trips/components/AdminActions';
import { UserRole } from '@/types';
import useDeleteTripMutation from '@/features/trips/api/useDeleteTripMutation';

export enum CloseSheetReason {
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    START = 'START',
    CLOSE = 'CLOSE',
}

export interface TripDetailsProps {
    trip: ITrip;
    onClose?: (reason: CloseSheetReason) => void;
}

function TripDetails({ trip, onClose }: TripDetailsProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const tripDetails = trip.tripDetails;
    const { deleteAction } = useDeleteTripMutation()
    const { editTrip } = useCreateTripStore()

    const { changeMode } = useTripStore();
    const [reason, setReason] = useState<CloseSheetReason | null>(null);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose?.(reason || CloseSheetReason.CLOSE);
            setReason(null);
        }
    }, [reason, onClose]);

    const handleStartTrip = () => {
        changeMode(AppModes.ACTIVE_TRIP);
        setReason(CloseSheetReason.START);
        bottomSheetRef.current?.close();
    }

    const handleDelete = () => {
        deleteAction(trip._id || '');

        setReason(CloseSheetReason.DELETE);
        bottomSheetRef.current?.close();
    }

    const handleEdit = () => {
        setReason(CloseSheetReason.EDIT);
        editTrip(trip);
        bottomSheetRef.current?.close();
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={trip ? 0 : -1}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: Colors.dark.primary }}
            handleStyle={{ backgroundColor: Colors.dark.darkForeground }}
            snapPoints={[280, 400]}>
            <BottomSheetView className="bg-background flex-1 p-2">
                <View>
                    <Text className="text-2xl text-primary font-bold">{tripDetails.title}</Text>

                    <View className='my-2'>
                        <Text className="text-foreground2 mb-2">Waypoints:</Text>

                        <WaypointList className='mb-2' waypoints={trip.waypoints || []} />

                        <View className='flex-row'>
                            <Badge>
                                <Text className='text-darkForeground'>{tripDetails.country}</Text>
                            </Badge>
                        </View>
                    </View>

                    <Text className="mt-1 text-foreground bg-darkForeground rounded-md p-1">{tripDetails.description}</Text>

                    <View className='flex flex-row justify-between items-center mt-4'>
                        <CustomButton className='mt-2 flex-row gap-2 items-center' onPress={handleStartTrip}>
                            <Ionicons name='play' size={24} color={Colors.dark.darkForeground} />
                            <Text className='font-bold text-2xl text-darkForeground'>Start Trip</Text>
                        </CustomButton>

                        <WithRoles roles={[UserRole.ADMIN]}>
                            <AdminActions tripId={trip._id || ''} onDelete={handleDelete} onEdit={handleEdit} />
                        </WithRoles>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default TripDetails