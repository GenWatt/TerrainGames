import CustomButton from '@/components/ui/Buttons/CustomButton';
import useAuth from '@/hooks/useAuth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text } from 'react-native';

export default function TabTwoScreen() {
  const { logout } = useAuth();

  return (
    <View className='p-4 bg-background flex-1'>
      <CustomButton onPress={logout}>
        <Ionicons name="log-out" size={24} color="black" />
        <Text>Logout</Text>
      </CustomButton>
    </View>
  );
}
