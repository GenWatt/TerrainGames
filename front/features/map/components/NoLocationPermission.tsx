
import { View, Text } from 'react-native';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import useUserLocation from '@/features/shared/hooks/useUserLocation';

function NoLocationPermission() {
    const { handleLocationPermission, hasLocationPermission, isLocationLoading } = useUserLocation();

    return (
        <>
            {!hasLocationPermission && !isLocationLoading && <View className="bg-background p-2 justify-center items-center">
                <Text className="text-primary text-2xl text-center font-bold">No location permission</Text>

                <CustomButton className="mt-2 self-center" onPress={handleLocationPermission}>
                    <Text className="text-darkForeground font-bold">Request permission</Text>
                </CustomButton>
            </View>}
        </>
    )
}

export default NoLocationPermission