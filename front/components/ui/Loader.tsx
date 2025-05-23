import Colors from '@/constants/Colors';
import { cn } from '@/utils/cn';
import { View, ActivityIndicator, Text, ViewProps } from 'react-native';

export interface LoaderProps extends ViewProps {
    showText?: boolean;
    color?: string;
}

function Loader({ showText = true, color, className, ...props }: LoaderProps) {
    return (
        <View className={cn("flex-1 justify-center items-center", className)} {...props}>
            <ActivityIndicator size="large" color={color || Colors.dark.primary} />
            {showText && <Text className="text-lg text-foreground mt-4">Loading...</Text>}
        </View>
    )
}

export default Loader