import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

export interface CustomInputProps extends TextInputProps { }

const CustomInput = forwardRef<TextInput, CustomInputProps>((props, ref) => {
    return <TextInput
        ref={ref}
        className="border-primary border rounded-2xl px-4 py-2 items-center flex-row gap-3 hover:bg-black text-foreground"
        {...props} />;
});

export default CustomInput;