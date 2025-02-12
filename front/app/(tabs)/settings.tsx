import CustomButton from '@/components/ui/Buttons/CustomButton';
import Loader from '@/components/ui/Loader';
import Colors from '@/constants/Colors';
import useSettings from '@/features/settings/hooks/useSettings';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text } from 'react-native';

export default function TabTwoScreen() {
  const { changeMetric, user, logout, isFetching, changeTemperatureUnit, currentTempUnit } = useSettings();

  return (
    <View className='p-4 bg-background flex-1 flex-row flex-wrap -m-2'>
      <View className='w-6/12 p-2'>
        <CustomButton className='w-full flex-row items-center gap-2' onPress={logout}>
          <Ionicons name="log-out" size={36} color="black" />
          <Text className='text-2xl font-bold'>Logout</Text>
        </CustomButton>
      </View>

      <View className='w-6/12 p-2'>
        <CustomButton className='w-full flex-row items-center gap-2 justify-center' onPress={changeMetric}>
          <Ionicons name="arrow-back-outline" size={32} color="black" />
          {isFetching
            ? <Loader showText={false} color={Colors.dark.darkForeground} />
            : <Text className='text-xl font-bold'>{user?.prefs.metricSystem}</Text>}
          <Ionicons name="arrow-forward" size={32} color="black" />
        </CustomButton>
      </View>

      <View className='w-6/12 p-2'>
        <CustomButton className='w-full flex-row items-center gap-2 justify-center' onPress={changeTemperatureUnit}>
          <Ionicons name="arrow-back-outline" size={32} color="black" />
          {isFetching
            ? <Loader showText={false} color={Colors.dark.darkForeground} />
            : <Text className='text-xl font-bold'>{currentTempUnit}</Text>}
          <Ionicons name="arrow-forward" size={32} color="black" />
        </CustomButton>
      </View>
    </View>
  );
}
