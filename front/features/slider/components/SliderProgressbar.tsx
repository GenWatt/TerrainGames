import clsx from 'clsx'
import { View, ViewProps } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

export interface SliderProgressbarProps extends ViewProps {
    progress: SharedValue<number>;
}

function SliderProgressbar({ progress, style, ...props }: SliderProgressbarProps) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progress.value * 100}%`
        }
    })

    return (
        <View className="absolute top-0 left-0 w-full h-1 bg-gray-300">
            <Animated.View className={clsx('h-full bg-primary')} style={[animatedStyle, style]} {...props} />
        </View>
    )
}

export default SliderProgressbar