import { cn } from "@/utils/cn";
import { View, ViewProps } from "react-native"

export interface SliderItemProps extends ViewProps {
    index: number;
    width: number;
}

function SliderItem({ children, width, index, className, ...props }: SliderItemProps) {
    return (
        <View className={cn(className, 'h-full')} key={index} style={{ width }} {...props}>
            {children}
        </View>
    )
}

export default SliderItem