import { cn } from '@/utils/cn';
import { Text, TextProps } from 'react-native'

export interface CustomTextProps extends TextProps {

}

function CustomText({ className, children, ...props }: CustomTextProps) {
    return (
        <Text className={cn('text-foreground text-md', className)} {...props}>
            {children}
        </Text>
    )
}

export default CustomText