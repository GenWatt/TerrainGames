import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import useSlider from '../hooks/useSlider';
import clsx from 'clsx';
import SliderIndicators from './SliderIndicators';
import SliderProgressbar from './SliderProgressbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import SliderContainer from './SliderContainer';

export interface SliderProps extends ViewProps {
    children: React.ReactNode[];
    interval?: number;
    width: number;
    itemProps?: ViewProps;
    sliderContainerProps?: ViewProps;
}

const Slider: React.FC<SliderProps> = ({ children, className, interval = 3000, width, itemProps, sliderContainerProps, ...props }) => {
    const { animatedStyle, panResponder, currentIndex, progress, togglePlay, isPlaying } = useSlider({ children, interval, width });

    return (
        <View className={clsx(className, 'overflow-hidden')} style={{ width }} {...props}>
            {isPlaying && <SliderProgressbar progress={progress} />
            }
            <Pressable onPress={togglePlay} className='absolute bottom-1 left-1 z-10 p-1 bg-primary/50 rounded-full'>
                <Ionicons name={isPlaying ? 'play' : 'pause'} size={12} color={Colors.dark.foreground2} />
            </Pressable>

            <SliderContainer animatedStyle={animatedStyle} width={width} itemProps={itemProps} panResponder={panResponder} {...sliderContainerProps}>
                {children}
            </SliderContainer>

            <SliderIndicators currentIndex={currentIndex} children={children} />
        </View>
    );
};

export default Slider;
