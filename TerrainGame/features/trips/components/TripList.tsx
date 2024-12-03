import { ITrip } from '@/store/createTripStore'
import { View } from 'react-native'
import TripItem from './TripItem'

export interface TripListProps {
    trips: ITrip[]
}

function TripList({ trips }: TripListProps) {
    return (
        <View className='mb-4'>
            {trips.map((trip) => (
                <TripItem key={trip._id} trip={trip} />
            ))}
        </View>
    )
}

export default TripList