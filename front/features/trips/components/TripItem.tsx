import WaypointList from '@/features/shared/componets/waypoint/WaypointList'
import { ITrip, useCreateTripStore } from '@/features/shared/stores/createTripStore'
import { View, Text } from 'react-native'
import AdminActions from './AdminActions'
import WithRoles from '@/features/shared/componets/auth/WithRoles'
import { UserRole } from '@/types'
import useDeleteTripMutation from '../api/useDeleteTripMutation'
import Animated, { useSharedValue, withSequence, withTiming, runOnJS, useAnimatedStyle } from 'react-native-reanimated'
import Badge from '@/components/ui/Badge'
import { useRouter } from 'expo-router'
import { AppModes, useTripStore } from '@/features/shared/stores/TripStore'

export interface TripItemProps {
    trip: ITrip
}

function TripItem({ trip }: TripItemProps) {
    const { deleteAction } = useDeleteTripMutation()
    const { editTrip } = useCreateTripStore()
    const { changeMode } = useTripStore()
    const router = useRouter()

    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);

    const handleDelete = () => {
        scale.value = withSequence(
            withTiming(0.8, { duration: 200 }),
            withTiming(0, { duration: 200 }, () => {
                runOnJS(onDelete)(trip._id || '');
            })
        );
        translateX.value = withTiming(100, { duration: 400 });
        opacity.value = withTiming(0, { duration: 400 });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }, { translateX: translateX.value }],
            opacity: opacity.value,
        };
    });

    const onDelete = (id: string) => {
        deleteAction(id);
    }

    const handleEdit = () => {
        editTrip(trip);
        changeMode(AppModes.EDIT_TRIP);
        router.push({ pathname: '/(tabs)' })
    }

    const { tripDetails } = trip;

    return (
        <Animated.View
            style={animatedStyle}
            className="bg-card rounded-2xl p-4 mb-4 shadow-md border-2 border-primary"
        >
            <Text className="text-lg font-semibold text-primary mb-1">
                {tripDetails.title}
            </Text>

            <View className='flex-row'>
                <Badge>
                    <Text className='text-darkForeground'>{tripDetails.country}</Text>
                </Badge>
            </View>

            <Text className="text-sm text-foreground mb-3">
                {tripDetails.description}
            </Text>

            <View className="border-t border-gray-600 pt-2">
                <WaypointList waypoints={trip.waypoints} />
            </View>

            <WithRoles roles={[UserRole.ADMIN]}>
                <AdminActions tripId={trip._id || ''} onDelete={handleDelete} onEdit={handleEdit} />
            </WithRoles>
        </Animated.View>
    )
}

export default TripItem