import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useCallback, useRef } from 'react'
import { ITrip } from '@/store/createTripStore';
import { View, Text } from 'react-native';
import WaypointList from '@/features/shared/componets/waypoint/WaypointList';
import Badge from '@/components/ui/Badge';
import Colors from '@/constants/Colors';

export interface TripDetailsProps {
    trip: ITrip | null;
    onClose?: () => void;
}

function TripDetails({ trip, onClose }: TripDetailsProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            bottomSheetRef.current?.close();
            onClose?.();
        }
    }, []);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={trip ? 0 : -1}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: Colors.dark.primary }}
            handleStyle={{ backgroundColor: Colors.dark.darkForeground }}
            snapPoints={[200, 400]}>
            <BottomSheetView className="bg-background flex-1 p-2">
                <View>
                    <Text className="text-xl text-primary font-bold">{trip?.title}</Text>

                    <View className='my-2'>
                        <Text className="text-foreground2 mb-2">Waypoints:</Text>

                        <WaypointList className='mb-2' waypoints={trip?.waypoints || []} />

                        <View className='flex-row'>
                            <Badge>
                                <Text className='text-darkForeground'>{trip?.country}</Text>
                            </Badge>
                        </View>
                    </View>

                    <Text className="mt-1 text-foreground">{trip?.description}</Text>
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default TripDetails