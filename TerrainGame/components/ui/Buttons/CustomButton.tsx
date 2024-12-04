import { Pressable, PressableProps } from "react-native"
import clsx from 'clsx'

export interface CustomButtonProps extends PressableProps { }

function CustomButton({ children, className, ...props }: CustomButtonProps) {
    return (
        <Pressable className={clsx("bg-primary rounded-xl p-3 self-start", className)} {...props}>
            {children}
        </Pressable>
    )
}

export default CustomButton