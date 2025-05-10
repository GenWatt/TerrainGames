import React, { forwardRef, useImperativeHandle } from 'react';
import { Dimensions, Pressable, View, ViewProps } from 'react-native';
import useSlider from '../hooks/useSlider';
import SliderIndicators from './SliderIndicators';
import SliderProgressbar from './SliderProgressbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import SliderContainer from './SliderContainer';
import { cn } from '@/utils/cn';

export interface SliderProps extends ViewProps {
    children: React.ReactNode[];
    interval?: number;
    width?: number;
    itemProps?: ViewProps;
    sliderContainerProps?: ViewProps;
    canStop?: boolean;
    isAutoChanging?: boolean;
    showIndicators?: boolean;
    swipeEnabled?: boolean;
}

export interface SliderRef {
    nextSlide: () => void;
    prevSlide: () => void;
    goTo: (index: number) => void;
}

const Slider = forwardRef<SliderRef, SliderProps>(({
    children,
    className,
    interval = 3000,
    width,
    itemProps,
    sliderContainerProps,
    canStop,
    isAutoChanging,
    showIndicators = true,
    swipeEnabled = true,
    ...props }, ref) => {

    const {
        animatedStyle,
        panResponder,
        currentIndex,
        progress,
        isPlaying,
        togglePlay,
        nextSlide,
        prevSlide,
        goTo
    } = useSlider({ children, interval, width, isAutoChanging });
    const containerWidth = width || Dimensions.get('window').width; // Default width if not provided

    useImperativeHandle(ref, () => ({
        nextSlide,
        prevSlide,
        goTo
    }))

    return (
        <View className={cn(className, 'overflow-hidden')} style={{ width: containerWidth }} {...props}>
            {isPlaying && <SliderProgressbar progress={progress} />}

            {canStop && <Pressable onPress={togglePlay} className='absolute bottom-1 left-1 z-10 p-1 bg-primary/50 rounded-full'>
                <Ionicons name={isPlaying ? 'play' : 'pause'} size={12} color={Colors.dark.foreground2} />
            </Pressable>}

            <SliderContainer
                animatedStyle={animatedStyle}
                width={containerWidth}
                itemProps={itemProps}
                panResponder={panResponder}
                {...sliderContainerProps}>
                {children}
            </SliderContainer>

            {showIndicators && <SliderIndicators currentIndex={currentIndex} children={children} />}
        </View>
    );
});

export default Slider;
