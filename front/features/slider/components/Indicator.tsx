import React, { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import clsx from "clsx";

interface IndicatorProps extends ViewProps {
    isActive: boolean;
}

const INDICATOR_SCALE = 1.5;

const Indicator: React.FC<IndicatorProps> = ({ isActive, className, style, ...props }) => {
    const scale = useSharedValue(isActive ? INDICATOR_SCALE : 1);

    useEffect(() => {
        scale.value = withSpring(isActive ? INDICATOR_SCALE : 1);
    }, [isActive]);

    const animatedDotStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View
            className={clsx('rounded-full w-2 h-2', isActive ? 'bg-primary' : 'bg-foreground2', className)}
            style={[animatedDotStyle, style]}
            {...props}
        />
    );
};

export default Indicator;