import { Text } from 'react-native'
import { useTripStore } from '../../stores/TripStore';

function DebugDisplay() {
    const { mode } = useTripStore();

    const isDev = process.env.NODE_ENV === 'development'

    return (
        <>
            {isDev && (
                <Text className='pl-4 bg-darkForeground text-foreground2 font-extrabold text-xl'>
                    Debug: {mode}
                </Text>
            )}
        </>
    )
}

export default DebugDisplay