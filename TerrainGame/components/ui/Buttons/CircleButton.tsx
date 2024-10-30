import { Pressable, PressableProps } from 'react-native'
import clsx from 'clsx'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '@/constants/Colors'

export interface CircleButtonProps extends PressableProps {
    children: React.ReactNode
}

export default function CircleButton({ children, className, ...props }: CircleButtonProps) {
    return (
        <Pressable {...props} className={clsx("w-10 h-10 bg-dim justify-center items-center rounded-md", className)}>
            {/* <LinearGradient
                style={{ borderRadius: 8, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                colors={['#d6ffd4', Colors.dark.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            > */}
            {children}
            {/* </LinearGradient> */}
        </Pressable>
    )
}