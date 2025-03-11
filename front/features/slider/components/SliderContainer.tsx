import { View, ViewProps, PanResponderInstance } from 'react-native'
import Animated from 'react-native-reanimated';
import SliderItem from './SliderItem';
import { cn } from '@/utils/cn';

export interface SliderContainerProps extends ViewProps {
    children: React.ReactNode[];
    width: number;
    itemProps?: ViewProps;
    animatedStyle: any;
    panResponder?: PanResponderInstance;
    swipeEnabled?: boolean;
}

function SliderContainer({ children, width, itemProps, animatedStyle, panResponder, swipeEnabled, ...props }: SliderContainerProps) {
    const style = {
        width: width * children.length,
    }

    const handlers = panResponder ? { ...panResponder.panHandlers } : {}

    return (
        <View {...props} {...handlers} style={[props.style]}>
            <Animated.View
                className={cn('flex-row')}
                style={[style, animatedStyle]}>
                {children.map((child, index) => (
                    <SliderItem key={index} index={index} width={width} {...itemProps}>
                        {child}
                    </SliderItem>
                ))}
            </Animated.View>
        </View>
    )
}

export default SliderContainer