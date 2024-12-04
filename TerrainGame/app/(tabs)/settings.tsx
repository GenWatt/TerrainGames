import CustomButton from '@/components/ui/Buttons/CustomButton';
import useAuth from '@/hooks/useAuth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text } from 'react-native';

export default function TabTwoScreen() {
  const { logout } = useAuth();

  return (
    <View className='p-4 bg-background flex-1 flex-row flex-wrap -m-2'>
      <View className='w-6/12 p-2'>
        <CustomButton className='w-full flex-row items-center gap-2' onPress={logout}>
          <Ionicons name="log-out" size={36} color="black" />
          <Text className='text-2xl font-bold'>Logout</Text>
        </CustomButton>
      </View>
    </View>
  );
}
