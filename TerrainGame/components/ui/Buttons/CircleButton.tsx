import { Pressable, PressableProps } from 'react-native'
import clsx from 'clsx'

export interface CircleButtonProps extends PressableProps {
    children: React.ReactNode
}

export default function CircleButton({ children, className, ...props }: CircleButtonProps) {
    return (
        <Pressable {...props} className={clsx("w-10 h-10 bg-dim justify-center items-center rounded-md", className)}>
            {children}
        </Pressable>
    )
}