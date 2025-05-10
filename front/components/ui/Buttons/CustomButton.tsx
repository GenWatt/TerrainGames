import { Pressable, PressableProps } from "react-native"
import { cn } from "@/utils/cn"

export interface CustomButtonProps extends PressableProps { }

function CustomButton({ children, className, ...props }: CustomButtonProps) {
    return (
        <Pressable className={cn("bg-primary rounded-xl p-3 self-start", className)} {...props}>
            {children}
        </Pressable>
    )
}

export default CustomButton