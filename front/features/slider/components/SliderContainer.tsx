import clsx from 'clsx'
import { View, ViewProps, PanResponderInstance } from 'react-native'
import Animated from 'react-native-reanimated';
import SliderItem from './SliderItem';

export interface SliderContainerProps extends ViewProps {
    children: React.ReactNode[];
    width: number;
    itemProps?: ViewProps;
    animatedStyle: any;
    panResponder: PanResponderInstance;
}

function SliderContainer({ children, width, itemProps, animatedStyle, panResponder, ...props }: SliderContainerProps) {
    const style = {
        width: width * children.length,
    }

    return (
        <View {...props} {...panResponder.panHandlers} style={[props.style]}>
            <Animated.View
                className={clsx('flex-row')}
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