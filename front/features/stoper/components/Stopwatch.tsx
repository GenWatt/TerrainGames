import CustomButton from '@/components/ui/Buttons/CustomButton';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Alert } from 'react-native';
import { useStopwatchStore } from '../stores/StopWatchStore';

function Stopwatch() {
    const { time, isRunning, start, pause, reset } = useStopwatchStore();

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleStop = () => {
        Alert.alert('Are you sure?', 'Do you want to stop the stopwatch?', [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: reset }
        ]);
    }

    return (
        <View className='absolute bottom-0 left-0 right-0 bg-background z-50 p-2 rounded-t-2xl'>
            <Text className='text-foreground2 text-2xl font-bold text-center'>
                {formatTime(time)}
            </Text>

            <View className='flex flex-row justify-center mt-4 gap-3'>
                {!isRunning && <CustomButton onPress={() => start(time)}>
                    <Ionicons name='play' size={24} color={Colors.dark.darkForeground} />
                </CustomButton>}
                {isRunning && <CustomButton onPress={pause}>
                    <Ionicons name='pause' size={24} color={Colors.dark.darkForeground} />
                </CustomButton>}
                <CustomButton onPress={handleStop}>
                    <Ionicons name='stop' size={24} color={Colors.dark.darkForeground} />
                </CustomButton>
            </View>
        </View>
    );
}

export default Stopwatch;