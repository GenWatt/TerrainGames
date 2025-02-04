import { useRef, useState, useEffect } from "react";
import { Dimensions, GestureResponderEvent, PanResponder, PanResponderGestureState } from "react-native";
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from "react-native-reanimated";

export interface UseSliderProps {
    children: React.ReactNode[];
    interval?: number;
    width?: number;
}

const defaultWidth = Dimensions.get('window').width;

const GESTURE_THRESHOLD = 15;

function useSlider({ children, interval = 3000, width = defaultWidth }: UseSliderProps) {
    const scrollX = useSharedValue(0);
    const progress = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleGesture = (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.dx > GESTURE_THRESHOLD) {
            prevSlide();
            resetTimer();
        } else if (gestureState.dx < -GESTURE_THRESHOLD) {
            nextSlide();
            resetTimer();
        }
    }

    const panResponder = useRef(PanResponder.create({ onMoveShouldSetPanResponder: () => true, onPanResponderRelease: handleGesture })).current;

    useEffect(() => {
        if (isPlaying) {
            startTimer();
        } else {
            clearTimer();
        }

        return () => clearTimer();
    }, [currentIndex, isPlaying]);

    const startTimer = () => {
        clearTimer();
        runProgressBar();

        timerRef.current = setInterval(handleInterval, interval);
    };

    const handleInterval = () => {
        nextSlide();
    }

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        progress.value = 0;
    };

    const resetTimer = () => {
        clearTimer();
        if (isPlaying) {
            startTimer();
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
    };

    const runProgressBar = () => {
        progress.value = 0;
        progress.value = withTiming(1, { duration: interval, easing: Easing.linear });
    };

    useEffect(() => {
        scrollX.value = withSpring(currentIndex * width);
    }, [currentIndex]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: -scrollX.value }],
        };
    });

    const togglePlay = () => {
        setIsPlaying((prev) => !prev);

        if (!isPlaying) {
            startTimer();
        } else {
            clearTimer();
        }
    };

    return { animatedStyle, progress, panResponder, width, currentIndex, togglePlay, isPlaying };
}

export default useSlider;
