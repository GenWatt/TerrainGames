import { cn } from '@/utils/cn'
import { Pressable, PressableProps } from 'react-native'

export interface CircleButtonProps extends PressableProps {
    children: React.ReactNode
}

export default function CircleButton({ children, className, ...props }: CircleButtonProps) {
    return (
        <Pressable {...props} className={cn("w-10 h-10 bg-dim justify-center items-center rounded-md disabled:bg-background/20", className)}>
            {children}
        </Pressable>
    )
}