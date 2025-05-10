import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ITrip } from '@/features/shared/stores/createTripStore';
import { View, Text } from 'react-native';
import WaypointList from '@/features/shared/componets/waypoint/WaypointList';
import Badge from '@/components/ui/Badge';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import WithRoles from '@/features/shared/componets/auth/WithRoles';
import AdminActions from '@/features/trips/components/AdminActions';
import { UserRole } from '@/types';
import useTripDetailsSheet from '../viewModels/useTripDetailsSheet.hook';

export enum CloseSheetReason {
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    START = 'START',
    CLOSE = 'CLOSE',
}

export interface TripDetailsSheetProps {
    trip: ITrip;
    onClose?: (reason: CloseSheetReason) => void;
}

const SHEET_HEIGHT = 300;

function TripDetailsSheet({ trip, onClose }: TripDetailsSheetProps) {
    const {
        bottomSheetRef,
        tripDetails,
        handleDelete,
        handleEdit,
        handleSheetChanges,
        handleStartTrip } = useTripDetailsSheet({ trip, onClose });

    return (
        <View className='bg-transparent z-10 absolute bottom-0 left-0 right-0' style={{ height: SHEET_HEIGHT }}>
            <BottomSheet
                ref={bottomSheetRef}
                index={trip ? 0 : -1}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                enableOverDrag={false}
                handleIndicatorStyle={{ backgroundColor: Colors.dark.primary }}
                handleStyle={{ backgroundColor: Colors.dark.darkForeground }}
                snapPoints={[SHEET_HEIGHT]}>
                <BottomSheetScrollView
                    style={{ flex: 1 }}
                    className="bg-background"
                    contentContainerStyle={{ padding: 16 }}>
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

                        <Text className="mt-1 text-foreground bg-darkForeground rounded-md p-1">
                            {tripDetails.description}
                        </Text>

                        <View className='flex flex-row justify-between items-center mt-4'>
                            <CustomButton className='mt-2 flex-row gap-2 items-center' onPress={handleStartTrip}>
                                <Ionicons name='play' size={24} color={Colors.dark.darkForeground} />
                                <Text className='font-bold text-2xl text-darkForeground'>Start Trip</Text>
                            </CustomButton>

                            <WithRoles roles={[UserRole.ADMIN]}>
                                <AdminActions tripId={trip?._id || ''} onDelete={handleDelete} onEdit={handleEdit} />
                            </WithRoles>
                        </View>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    )
}

export default TripDetailsSheet