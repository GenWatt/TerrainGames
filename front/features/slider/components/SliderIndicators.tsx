import React from "react";
import { View } from "react-native";
import Indicator from "./Indicator";

export interface SliderIndicatorsProps {
    children: React.ReactNode[];
    currentIndex: number;
}

function SliderIndicators({ children, currentIndex }: SliderIndicatorsProps) {
    return (
        <View className='flex-row justify-center mb-1 gap-1 flex-wrap px-7'>
            {children.map((_, index) => (
                <Indicator key={index} isActive={currentIndex === index} />
            ))}
        </View>
    );
}

export default SliderIndicators;