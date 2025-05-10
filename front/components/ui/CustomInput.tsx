import Colors from "@/constants/Colors";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

export interface CustomInputProps extends TextInputProps { }

const CustomInput = forwardRef<TextInput, CustomInputProps>(({ className, ...props }, ref) => {
    return <TextInput
        ref={ref}
        placeholderTextColor={Colors.dark.primary}
        className={cn("border-primary border rounded-2xl px-4 py-2 items-center flex-row gap-3 hover:bg-black text-foreground", className)}
        {...props} />;
});

export default CustomInput;